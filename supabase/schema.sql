-- ShieldNet AI — Supabase PostgreSQL Schema
-- Run this in the Supabase SQL editor to set up the full database.

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS (extends auth.users)
-- ============================================================
create table public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  name        text not null,
  phone       text not null,
  role        text not null check (role in ('individual','business_admin','business_member','gov_admin','superadmin')),
  created_at  timestamptz default now() not null
);

alter table public.users enable row level security;

create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Service role can manage all users"
  on public.users for all
  using (auth.role() = 'service_role');

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
create table public.subscriptions (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references public.users(id) on delete cascade,
  plan                text not null check (plan in ('personal_free','personal_pro','business_starter','business_pro','business_enterprise','government')),
  status              text not null check (status in ('trial','active','expired','cancelled')) default 'trial',
  billing_cycle       text not null check (billing_cycle in ('monthly','annual')) default 'monthly',
  moolre_payment_ref  text,
  start_date          timestamptz not null default now(),
  end_date            timestamptz,
  trial_end_date      timestamptz default (now() + interval '14 days'),
  created_at          timestamptz default now() not null
);

alter table public.subscriptions enable row level security;

create policy "Users can read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Service role can manage all subscriptions"
  on public.subscriptions for all
  using (auth.role() = 'service_role');

-- ============================================================
-- BUSINESSES
-- ============================================================
create table public.businesses (
  id            uuid primary key default uuid_generate_v4(),
  admin_user_id uuid not null references public.users(id) on delete cascade,
  company_name  text not null,
  size          text not null default 'small',
  plan          text not null check (plan in ('business_starter','business_pro','business_enterprise')),
  created_at    timestamptz default now() not null
);

alter table public.businesses enable row level security;

create policy "Business admins can read own business"
  on public.businesses for select
  using (auth.uid() = admin_user_id);

create policy "Service role can manage all businesses"
  on public.businesses for all
  using (auth.role() = 'service_role');

-- ============================================================
-- BUSINESS MEMBERS
-- ============================================================
create table public.business_members (
  id          uuid primary key default uuid_generate_v4(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  user_id     uuid not null references public.users(id) on delete cascade,
  role        text not null check (role in ('admin','member')) default 'member',
  unique (business_id, user_id)
);

alter table public.business_members enable row level security;

create policy "Business members can read their membership"
  on public.business_members for select
  using (auth.uid() = user_id);

create policy "Service role can manage all memberships"
  on public.business_members for all
  using (auth.role() = 'service_role');

-- ============================================================
-- ALERTS (threat scenario library)
-- ============================================================
create table public.alerts (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  severity    text not null check (severity in ('critical','warning','info')),
  type        text not null check (type in ('malware','ransomware','phishing','zero_day','breach','identity_theft','apt','infrastructure')),
  created_at  timestamptz default now() not null
);

alter table public.alerts enable row level security;

create policy "Authenticated users can read alerts"
  on public.alerts for select
  using (auth.role() = 'authenticated');

create policy "Service role can manage all alerts"
  on public.alerts for all
  using (auth.role() = 'service_role');

-- ============================================================
-- USER ALERTS (alert instances per user)
-- ============================================================
create table public.user_alerts (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.users(id) on delete cascade,
  alert_id      uuid not null references public.alerts(id) on delete cascade,
  status        text not null check (status in ('active','resolved','dismissed')) default 'active',
  sms_sent      boolean default false,
  sms_delivered boolean default false,
  created_at    timestamptz default now() not null
);

alter table public.user_alerts enable row level security;

create policy "Users can read own alerts"
  on public.user_alerts for select
  using (auth.uid() = user_id);

create policy "Users can update own alert status"
  on public.user_alerts for update
  using (auth.uid() = user_id);

create policy "Service role can manage all user_alerts"
  on public.user_alerts for all
  using (auth.role() = 'service_role');

-- Enable Realtime on user_alerts
alter publication supabase_realtime add table public.user_alerts;

-- ============================================================
-- SMS LOGS
-- ============================================================
create table public.sms_logs (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.users(id) on delete set null,
  alert_id    uuid references public.alerts(id) on delete set null,
  phone       text not null,
  message     text not null,
  moolre_ref  text,
  status      text not null check (status in ('pending','sent','delivered','failed')) default 'pending',
  sent_at     timestamptz default now() not null
);

alter table public.sms_logs enable row level security;

create policy "Service role can manage all sms_logs"
  on public.sms_logs for all
  using (auth.role() = 'service_role');

create policy "Users can read own sms logs"
  on public.sms_logs for select
  using (auth.uid() = user_id);

-- ============================================================
-- SCAM REPORTS
-- ============================================================
create table public.scam_reports (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.users(id) on delete cascade,
  description  text not null,
  reported_via text not null check (reported_via in ('web','email')) default 'web',
  status       text not null check (status in ('open','investigating','resolved')) default 'open',
  created_at   timestamptz default now() not null
);

alter table public.scam_reports enable row level security;

create policy "Users can read own scam reports"
  on public.scam_reports for select
  using (auth.uid() = user_id);

create policy "Users can insert own scam reports"
  on public.scam_reports for insert
  with check (auth.uid() = user_id);

create policy "Service role can manage all scam_reports"
  on public.scam_reports for all
  using (auth.role() = 'service_role');

-- ============================================================
-- SEED: 18 REALISTIC THREAT SCENARIOS
-- ============================================================
insert into public.alerts (title, description, severity, type) values

-- Malware
('Emotet Banking Trojan Resurgence',
 'A new Emotet variant (TA542 campaign) is spreading via malicious macro-enabled Word documents delivered through compromised email accounts. The malware establishes persistence via scheduled tasks and registry run keys, then downloads secondary payloads including QBot and Cobalt Strike beacons.',
 'critical', 'malware'),

('TrickBot Module Deployment Detected',
 'TrickBot banking trojan with its injectDll module active on endpoints. The malware is harvesting browser credentials, stealing cached passwords, and performing lateral movement via SMB exploitation (MS17-010). Associated with ITG23/Wizard Spider threat group.',
 'warning', 'malware'),

-- Ransomware
('LockBit 3.0 Ransomware Execution Attempt',
 'LockBit 3.0 (BlackMatter) ransomware execution blocked on three endpoints. The malware attempted to disable Volume Shadow Copies, stop backup services, and encrypt files using ChaCha20-256. IOCs match CISA Advisory AA23-165A. Immediate containment required.',
 'critical', 'ransomware'),

('BlackCat (ALPHV) Ransomware Network Activity',
 'Network traffic signatures consistent with BlackCat/ALPHV ransomware C2 communication detected. The group is known for triple extortion — encryption, data theft, and DDoS threats. A ransom note draft was found in a temp directory on a finance workstation.',
 'critical', 'ransomware'),

-- Phishing
('CEO Fraud Wire Transfer Phishing',
 'A spear-phishing email impersonating the CEO requested an urgent $47,000 wire transfer to a new vendor account. The email originated from a lookalike domain registered 3 days ago. Three finance team members clicked the link before the campaign was blocked.',
 'critical', 'phishing'),

('Microsoft 365 Credential Harvesting Campaign',
 'An active phishing campaign is targeting Microsoft 365 users with fake "Your account will be suspended" emails. The landing page uses EvilGinx2 reverse proxy to capture MFA tokens in real-time, bypassing standard 2FA protections.',
 'warning', 'phishing'),

('Smishing Attack: FedEx Package Scam',
 'A bulk SMS phishing campaign (smishing) is targeting users claiming to be FedEx delivery notifications. Links lead to a fake payment portal collecting credit card details. 2 users in your organization have received and interacted with these messages.',
 'warning', 'phishing'),

-- Zero-Day
('CVE-2024-21887 Ivanti Zero-Day Exploited',
 'Active exploitation of CVE-2024-21887 (Ivanti Connect Secure RCE, CVSS 9.1) detected against your VPN appliance. The vulnerability allows unauthenticated remote code execution. This is being exploited by UNC5221 (suspected China-nexus APT). Patch immediately.',
 'critical', 'zero_day'),

('CVE-2025-0282 Windows LSA Zero-Day',
 'Intelligence indicates a newly discovered Windows Local Security Authority (LSA) zero-day is being auctioned on dark web forums. CVE-2025-0282 enables SYSTEM privilege escalation on all Windows 10/11 versions. No patch available yet. Compensating controls advised.',
 'warning', 'zero_day'),

-- Data Breach
('Employee Credentials Found in Dark Web Dump',
 'ShieldNet dark web monitoring detected 14 employee email addresses and bcrypt-hashed passwords in the "ComboDB 2025" data dump published on BreachForums. Credentials are from a third-party HR portal breach. Forced password reset initiated for affected accounts.',
 'critical', 'breach'),

('Customer PII Exfiltration Detected',
 'Unusual outbound data transfer of 2.3GB detected to an IP address in Romania. Traffic analysis shows structured JSON resembling customer records including names, email addresses, and partial payment data. Source appears to be a compromised API key used by a third-party integration.',
 'critical', 'breach'),

-- Identity Theft
('Dark Web Alert: Your Email Credentials Exposed',
 'Your monitored email address was found in a newly published credential database alongside a plaintext password. The password hash was cracked within 6 hours of the dump being published. Immediate password change and MFA enablement recommended.',
 'critical', 'identity_theft'),

('Suspicious Login from Unrecognized Device',
 'Successful authentication to your account detected from a new device (iPhone 15 Pro, iOS 17.4) in Lagos, Nigeria — 2,400km from your last known location. If this was not you, your credentials may be compromised. Session has been flagged for review.',
 'warning', 'identity_theft'),

-- APT
('APT29 (Cozy Bear) Tactics Detected in Network',
 'Network telemetry matches TTPs associated with APT29 (SVR, Russia). Indicators include WellMess/WellMail malware signatures, use of Tor exit nodes for C2, and LOTL (Living off the Land) techniques using legitimate Windows tools. Consistent with SolarWinds-era playbook.',
 'critical', 'apt'),

('Lazarus Group Supply Chain Reconnaissance',
 'Threat intelligence indicates Lazarus Group (DPRK) is actively targeting financial sector software supply chains in West Africa. IOCs include malicious npm packages containing obfuscated backdoors and spear-phishing of software developers. CISA TLP:WHITE advisory issued.',
 'warning', 'apt'),

('APT41 Dual-Espionage Activity Indicators',
 'APT41 (Winnti, BARIUM — China-nexus) indicators detected: use of DUSTPAN dropper, ShadowPad C2 infrastructure, and targeting of a healthcare data endpoint. APT41 conducts both espionage and financially motivated attacks. Targeted sector matches your industry profile.',
 'warning', 'apt'),

-- Infrastructure
('Industrial Control System (SCADA) Anomaly',
 'Anomalous Modbus TCP traffic detected on the OT/ICS network segment targeting PLCs in the water treatment monitoring system. Traffic pattern matches Industroyer2/INCONTROLLER malware used in Ukrainian infrastructure attacks. Air-gap enforcement recommended immediately.',
 'critical', 'infrastructure'),

('Power Grid Monitoring: Unusual Load Pattern',
 'Automated telemetry from grid monitoring endpoints shows irregular load fluctuation patterns consistent with pre-attack reconnaissance observed before the 2022 Ukraine power grid incidents. Patterns suggest automated probing of SCADA interfaces on TCP/102 (IEC 61850).',
 'warning', 'infrastructure');
