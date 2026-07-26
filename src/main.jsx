import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  FaAppleWhole,
  FaArrowRight,
  FaArrowTrendUp,
  FaBars,
  FaBell,
  FaBookOpen,
  FaCalendarDays,
  FaCamera,
  FaCapsules,
  FaChartColumn,
  FaCheck,
  FaChevronDown,
  FaChevronRight,
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleInfo,
  FaCircleQuestion,
  FaClock,
  FaDownload,
  FaDroplet,
  FaEllipsisVertical,
  FaFileLines,
  FaFilter,
  FaFlaskVial,
  FaGaugeHigh,
  FaGear,
  FaGlassWater,
  FaHandSparkles,
  FaHeadset,
  FaHeart,
  FaHeartPulse,
  FaHospital,
  FaHouse,
  FaKitchenSet,
  FaLocationDot,
  FaLock,
  FaMagnifyingGlass,
  FaMessage,
  FaNotesMedical,
  FaPaperPlane,
  FaPen,
  FaPhone,
  FaPlay,
  FaPlus,
  FaPumpMedical,
  FaPrint,
  FaShieldHeart,
  FaSliders,
  FaStethoscope,
  FaSuitcaseMedical,
  FaSyringe,
  FaUserDoctor,
  FaUserGroup,
  FaUtensils,
  FaUpload,
  FaWeightScale,
  FaXmark,
} from 'react-icons/fa6';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import '@fontsource-variable/inter';
import './styles.css';

const TODAY = 'July 20, 2026';
const palette = {
  teal: '#078f94',
  tealDark: '#05747a',
  tealSoft: '#e7f7f6',
  navy: '#0a2548',
  blue: '#2d83ec',
  blueSoft: '#edf6ff',
  green: '#28a968',
  orange: '#f59a23',
  red: '#ef5350',
  purple: '#8f5cd6',
};

const kitSections = [
  {
    id: 'kidney', letter: 'K', label: 'myKidney', tagline: 'Your care journey', start: 'home',
    items: [
      { id: 'home', label: 'Kidney Overview', icon: FaHouse },
      { id: 'treatments', label: 'Treatments', icon: FaSuitcaseMedical },
      { id: 'vascular', label: 'Vascular Access', icon: FaSyringe },
      { id: 'transplant', label: 'Transplant Path', icon: FaHospital },
    ],
  },
  {
    id: 'insights', letter: 'I', label: 'myInsights', tagline: 'Understand what is happening', start: 'insights',
    items: [
      { id: 'insights', label: 'Insights Overview', icon: FaChartColumn },
      { id: 'health', label: 'Health Trends', icon: FaHeartPulse },
      { id: 'labs', label: 'Lab Results', icon: FaFlaskVial },
    ],
  },
  {
    id: 'tools', letter: 'T', label: 'myTools', tagline: 'Take action every day', start: 'tools',
    items: [
      { id: 'tools', label: 'Tools Overview', icon: FaSliders },
      { id: 'medications', label: 'Medications', icon: FaCapsules },
      { id: 'diet', label: 'Diet & Nutrition', icon: FaAppleWhole },
      { id: 'fluid', label: 'Fluid Tracker', icon: FaDroplet },
      { id: 'appointments', label: 'Appointments', icon: FaCalendarDays },
      { id: 'education', label: 'Education', icon: FaBookOpen },
      { id: 'messages', label: 'Messages', icon: FaMessage },
      { id: 'support', label: 'Support', icon: FaHeadset },
      { id: 'settings', label: 'Settings', icon: FaGear },
    ],
  },
];
const navItems = kitSections.flatMap((section) => section.items);
const kitForPage = (page) => kitSections.find((section) => section.items.some((item) => item.id === page)) || kitSections[0];

const healthMetrics = [
  { label: 'eGFR', value: '18', unit: 'mL/min/1.73m²', date: 'Jul 18, 2026', tone: 'green', status: 'Stage 4', trend: [20, 20, 19, 19, 18, 19, 18, 18, 17, 18] },
  { label: 'K+ (Potassium)', value: '4.8', unit: 'mmol/L', date: 'Jul 18, 2026', tone: 'orange', status: 'Watch', trend: [4.5, 4.4, 4.3, 4.2, 4.1, 4.3, 4.5, 4.6, 4.8, 4.8] },
  { label: 'Hb (Hemoglobin)', value: '10.2', unit: 'g/dL', date: 'Jul 18, 2026', tone: 'green', status: 'Stable', trend: [9.8, 10.0, 10.1, 9.9, 10.1, 10.0, 10.2, 10.3, 10.1, 10.2] },
  { label: 'Phosphorus', value: '5.6', unit: 'mg/dL', date: 'Jul 18, 2026', tone: 'red', status: 'High', trend: [5.0, 4.8, 5.1, 5.2, 5.0, 5.4, 5.3, 5.7, 5.5, 5.6] },
];

const initialMedications = [
  { id: 1, name: 'Sevelamer 800 mg', instructions: '1 tablet with meals', time: '8:00 AM', status: 'taken', icon: FaCapsules },
  { id: 2, name: 'Amlodipine 5 mg', instructions: '1 tablet once daily', time: '8:00 PM', status: 'due', icon: FaCapsules },
  { id: 3, name: 'Calcitriol 0.25 mcg', instructions: '1 capsule once daily', time: '8:00 PM', status: 'due', icon: FaFileLines },
  { id: 4, name: 'Epoetin alfa', instructions: 'Injection as prescribed', time: 'Jul 25', status: 'scheduled', icon: FaSyringe },
];

const educationArticles = [
  { id: 1, title: 'Low Potassium Foods', subtitle: 'Learn which foods are safer for your kidneys.', category: 'Nutrition', length: '4 min read', image: '/assets/education-low-potassium.jpg' },
  { id: 2, title: 'Staying Active with CKD', subtitle: 'Tips for safe and effective physical activity.', category: 'Lifestyle', length: '5 min read', image: '/assets/education-active-ckd.jpg' },
  { id: 3, title: 'Understanding Dialysis', subtitle: 'Know what to expect before and after treatment.', category: 'Treatment', length: '7 min read', image: '/assets/education-dialysis.jpg' },
];

const fluidHistory = [
  { day: 'Tue', amount: 1350 },
  { day: 'Wed', amount: 1450 },
  { day: 'Thu', amount: 1220 },
  { day: 'Fri', amount: 1510 },
  { day: 'Sat', amount: 1380 },
  { day: 'Sun', amount: 1420 },
  { day: 'Mon', amount: 1200 },
];

const labRows = [
  { test: 'eGFR', current: '18', previous: '19', unit: 'mL/min/1.73m²', range: '≥ 60', status: 'low', date: 'Jul 18, 2026' },
  { test: 'Potassium', current: '4.8', previous: '4.6', unit: 'mmol/L', range: '3.5–5.1', status: 'normal', date: 'Jul 18, 2026' },
  { test: 'Phosphorus', current: '5.6', previous: '5.3', unit: 'mg/dL', range: '2.5–4.5', status: 'high', date: 'Jul 18, 2026' },
  { test: 'Hemoglobin', current: '10.2', previous: '10.1', unit: 'g/dL', range: '12.0–16.0', status: 'low', date: 'Jul 18, 2026' },
  { test: 'Albumin', current: '3.9', previous: '3.8', unit: 'g/dL', range: '3.5–5.0', status: 'normal', date: 'Jul 18, 2026' },
  { test: 'Calcium', current: '9.1', previous: '8.9', unit: 'mg/dL', range: '8.6–10.2', status: 'normal', date: 'Jul 18, 2026' },
];

const appointments = [
  { id: 1, month: 'JUL', day: '21', title: 'Hemodialysis', clinician: 'City Kidney Center', time: '7:00 AM', type: 'In person' },
  { id: 2, month: 'JUL', day: '23', title: 'Nephrology Follow-up', clinician: 'Dr. Sarah Johnson', time: '10:30 AM', type: 'Video visit' },
  { id: 3, month: 'JUL', day: '27', title: 'Renal Dietitian', clinician: 'Melissa Chen, RD', time: '2:00 PM', type: 'In person' },
];

const trendData = [
  { date: 'Jan', egfr: 22, phosphorus: 4.7, potassium: 4.3 },
  { date: 'Feb', egfr: 21, phosphorus: 4.8, potassium: 4.2 },
  { date: 'Mar', egfr: 20, phosphorus: 5.0, potassium: 4.4 },
  { date: 'Apr', egfr: 20, phosphorus: 5.2, potassium: 4.5 },
  { date: 'May', egfr: 19, phosphorus: 5.3, potassium: 4.6 },
  { date: 'Jun', egfr: 19, phosphorus: 5.4, potassium: 4.7 },
  { date: 'Jul', egfr: 18, phosphorus: 5.6, potassium: 4.8 },
];

const weekTreatments = [
  { day: 'Mon', date: '20', state: 'today', label: 'Rest day' },
  { day: 'Tue', date: '21', state: 'treatment', label: 'Dialysis · 7:00 AM' },
  { day: 'Wed', date: '22', state: 'rest', label: 'Recovery' },
  { day: 'Thu', date: '23', state: 'treatment', label: 'Dialysis · 7:00 AM' },
  { day: 'Fri', date: '24', state: 'rest', label: 'Lab check' },
  { day: 'Sat', date: '25', state: 'treatment', label: 'Dialysis · 7:00 AM' },
  { day: 'Sun', date: '26', state: 'rest', label: 'Rest day' },
];

const careThreads = [
  { id: 1, name: 'Dr. Sarah Johnson', role: 'Nephrologist', initials: 'SJ', preview: 'Your latest labs look stable overall.', time: '9:42 AM', unread: 2 },
  { id: 2, name: 'Melissa Chen, RD', role: 'Renal Dietitian', initials: 'MC', preview: 'I added the low-phosphorus meal guide.', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Kidney Center Care Team', role: 'Care coordination', initials: 'KC', preview: 'Reminder: treatment starts at 7:00 AM.', time: 'Jul 18', unread: 0 },
];

function classNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

function Card({ className = '', children, as: Tag = 'section' }) {
  return <Tag className={classNames('card', className)}>{children}</Tag>;
}

function SectionHeader({ title, action, onAction, icon: Icon }) {
  return (
    <div className="section-header">
      <div className="section-title-wrap">
        {Icon ? <Icon aria-hidden="true" /> : null}
        <h2>{title}</h2>
      </div>
      {action ? (
        <button className="text-button" type="button" onClick={onAction}>
          {action}
        </button>
      ) : null}
    </div>
  );
}

function ScanBanner({ icon: Icon, title, text, onScan }) {
  return (
    <section className="scan-banner">
      <span className="scan-banner-icon"><Icon /></span>
      <div><span className="eyebrow">SMART IMPORT</span><h2>{title}</h2><p>{text}</p></div>
      <button className="primary-button" type="button" onClick={onScan}><FaCamera /> Scan or upload</button>
    </section>
  );
}

function Sidebar({ activePage, onNavigate, mobileOpen, onClose }) {
  const activeKit = kitForPage(activePage);
  const goToPage = (page) => {
    onNavigate(page);
    onClose();
  };
  return (
    <>
      <button
        className={classNames('sidebar-scrim', mobileOpen && 'is-open')}
        onClick={onClose}
        aria-label="Close navigation"
        tabIndex={mobileOpen ? 0 : -1}
      />
      <aside className={classNames('sidebar', mobileOpen && 'is-open')} aria-label="Primary navigation">
        <div className="brand">
          <div className="brand-wordmark"><span>my</span>KIT</div>
          <div className="brand-subtitle">Your kidney health kit</div>
        </div>
        <nav className="kit-nav" aria-label="myKIT navigation">
          {kitSections.map((section) => {
            const expanded = activeKit.id === section.id;
            const sectionLabelId = `kit-section-${section.id}`;
            return (
              <section key={section.id} className={classNames('kit-nav-group', `kit-${section.id}`, expanded && 'expanded')}>
                <button
                  id={sectionLabelId}
                  className="kit-nav-parent"
                  type="button"
                  onClick={() => goToPage(section.start)}
                  aria-expanded={expanded}
                  aria-controls={`kit-links-${section.id}`}
                >
                  <b className="kit-letter" aria-hidden="true">{section.letter}</b>
                  <span className="kit-parent-copy">
                    <strong>{section.label}</strong>
                    <small>{section.tagline}</small>
                  </span>
                  <FaChevronDown className="kit-parent-chevron" aria-hidden="true" />
                </button>
                <div
                  id={`kit-links-${section.id}`}
                  className="kit-nav-children"
                  role="group"
                  aria-labelledby={sectionLabelId}
                  hidden={!expanded}
                >
                  {section.items.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      className={classNames('kit-nav-link', activePage === id && 'active')}
                      type="button"
                      onClick={() => goToPage(id)}
                      aria-current={activePage === id ? 'page' : undefined}
                    >
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </nav>
        <div className="sidebar-utility">
          <span className="sidebar-utility-icon"><HeadsetIcon /></span>
          <span><strong>Need help?</strong><small>Care team & support</small></span>
          <button type="button" onClick={() => goToPage('support')} aria-label="Open support">
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
        <div className="version">myKIT 2.2.0</div>
      </aside>
    </>
  );
}

function HeadsetIcon() {
  return <FaHeadset aria-hidden="true" />;
}

function Header({ activePage, onMenu, onOpenNotifications, onNavigate }) {
  const label = navItems.find((item) => item.id === activePage)?.label || 'Home';
  const activeKit = kitForPage(activePage);
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-button menu-button" type="button" onClick={onMenu} aria-label="Open navigation">
          <FaBars />
        </button>
        <div>
          <span className={classNames('topbar-kit-tag', `kit-${activeKit.id}`)}><b>{activeKit.letter}</b>{activeKit.label}</span>
          {activePage === 'home' ? (
            <>
              <h1>Hello, John <FaHandSparkles className="hello-icon" aria-hidden="true" /></h1>
              <p>Take charge of your kidney health today.</p>
            </>
          ) : (
            <>
              <h1>{label}</h1>
              <p>{pageSubtitle(activePage)}</p>
            </>
          )}
        </div>
      </div>
      <div className="topbar-actions">
        <button className="icon-button notification-button" type="button" onClick={onOpenNotifications} aria-label="Open notifications">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>
        <button className="profile-button" type="button" onClick={() => onNavigate('settings')} aria-label="Open profile settings">
          <img src="/assets/john-avatar.jpg" alt="John's profile" />
          <FaChevronDown aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

function pageSubtitle(page) {
  const map = {
    insights: 'Reports, trends, and deep dives that explain what is changing.',
    tools: 'Everyday actions that help you stay on top of your care.',
    health: 'See your trends, goals, and daily health snapshot.',
    treatments: 'Plan ahead and feel prepared for every treatment.',
    vascular: 'Protect, monitor, and coordinate care for your dialysis access.',
    transplant: 'Track every prerequisite on the path to the transplant list.',
    medications: 'Stay on schedule with medicines and reminders.',
    diet: 'Build kidney-friendly meals around your care plan.',
    fluid: 'Track daily intake and stay within your target.',
    appointments: 'Manage visits with your care team.',
    labs: 'Understand your latest results and what changed.',
    education: 'Learn at your pace with trusted kidney-health guidance.',
    messages: 'Stay connected with your kidney care team.',
    support: 'Get help from people who know your care plan.',
    settings: 'Manage your profile, alerts, and privacy choices.',
  };
  return map[page] || 'Kidney health information in one place.';
}

function MetricCard({ metric, onClick }) {
  const color = palette[metric.tone] || palette.teal;
  const data = metric.trend.map((value, index) => ({ index, value }));
  return (
    <button className="metric-card" type="button" onClick={onClick} aria-label={`View ${metric.label} details`}>
      <div className="metric-label">{metric.label}</div>
      <div className="metric-value" style={{ color }}>{metric.value}</div>
      <div className="metric-unit">{metric.unit}</div>
      <div className="metric-date">{metric.date}</div>
      <div className="sparkline" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <LineChart data={data} margin={{ top: 4, right: 2, bottom: 2, left: 2 }}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2.2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </button>
  );
}

function HealthSummary({ onNavigate }) {
  return (
    <Card className="health-summary-card">
      <SectionHeader title="Health Summary" action="View All" onAction={() => onNavigate('health')} />
      <div className="metrics-grid">
        {healthMetrics.map((metric) => <MetricCard key={metric.label} metric={metric} onClick={() => onNavigate('labs')} />)}
      </div>
      <div className="summary-note"><FaCircleInfo aria-hidden="true" /> Keep up the good work! Your numbers are trending stable.</div>
    </Card>
  );
}

function TreatmentCard({ onNavigate, openModal }) {
  return (
    <Card className="treatment-card">
      <SectionHeader title="Upcoming Treatment" />
      <button className="more-button" type="button" aria-label="Treatment options" onClick={() => openModal('treatmentOptions')}><FaEllipsisVertical /></button>
      <div className="treatment-main">
        <div className="treatment-ring" aria-hidden="true">
          <FaPumpMedical />
        </div>
        <div>
          <h3>Hemodialysis</h3>
          <strong>Tomorrow</strong>
          <p>Tuesday, July 21</p>
          <span className="time-pill">07:00 AM</span>
        </div>
      </div>
      <div className="location-row"><FaLocationDot aria-hidden="true" /><span>City Kidney Center<br /><small>123 Health St, Cityville</small></span></div>
      <button className="primary-button full" type="button" onClick={() => onNavigate('treatments')}>View Treatment Schedule</button>
    </Card>
  );
}

function MedicationsCard({ medications, onToggle, onNavigate, openModal }) {
  return (
    <Card className="medications-card">
      <SectionHeader title="Medications" action="View All" onAction={() => onNavigate('medications')} />
      <div className="medication-list compact">
        {medications.map((med) => {
          const Icon = med.icon;
          return (
            <button className="medication-row" key={med.id} type="button" onClick={() => med.status === 'due' ? onToggle(med.id) : openModal('medication', med)}>
              <span className={classNames('med-icon', med.status)}><Icon /></span>
              <span className="med-main"><strong>{med.name}</strong><small>{med.instructions}</small></span>
              <span className={classNames('med-status', med.status)}>
                {med.status === 'taken' ? <FaCircleCheck /> : med.status === 'due' ? <FaClock /> : <FaCalendarDays />}
                <span>{med.status === 'taken' ? 'Taken' : med.status === 'due' ? 'Due' : 'Next dose'}<small>{med.time}</small></span>
              </span>
            </button>
          );
        })}
      </div>
      <button className="card-footer-button" type="button" onClick={() => openModal('reminder')}><FaBell /> Set Medication Reminder</button>
    </Card>
  );
}

const quickActions = [
  { label: 'Log My Vitals', icon: FaHeartPulse, tone: 'teal', action: 'logVitals' },
  { label: 'Track Fluid', icon: FaDroplet, tone: 'blue', action: 'fluid' },
  { label: 'Log Weight', icon: FaWeightScale, tone: 'purple', action: 'logWeight' },
  { label: 'Diet Diary', icon: FaAppleWhole, tone: 'green', action: 'diet' },
  { label: 'View Reports', icon: FaFileLines, tone: 'orange', action: 'labs' },
  { label: 'Ask a Question', icon: FaCircleQuestion, tone: 'pink', action: 'messages' },
];

function QuickActions({ onNavigate, openModal }) {
  const act = (action) => {
    if (['fluid', 'diet', 'labs', 'messages'].includes(action)) onNavigate(action);
    else openModal(action);
  };
  return (
    <Card>
      <SectionHeader title="Quick Actions" />
      <div className="quick-actions-grid">
        {quickActions.map(({ label, icon: Icon, tone, action }) => (
          <button className={classNames('quick-action', `tone-${tone}`)} key={label} type="button" onClick={() => act(action)}>
            <span><Icon aria-hidden="true" /></span>
            {label}
          </button>
        ))}
      </div>
    </Card>
  );
}

function EducationCard({ onNavigate, openModal }) {
  return (
    <Card>
      <SectionHeader title="Education Corner" action="View All" onAction={() => onNavigate('education')} />
      <div className="education-list">
        {educationArticles.map((article) => (
          <button className="education-row" type="button" key={article.id} onClick={() => openModal('article', article)}>
            <img src={article.image} alt="" />
            <span><strong>{article.title}</strong><small>{article.subtitle}</small></span>
            <FaChevronRight aria-hidden="true" />
          </button>
        ))}
      </div>
    </Card>
  );
}

function FluidGauge({ current, goal, size = 170 }) {
  const pct = Math.min(100, Math.round((current / goal) * 100));
  const data = [{ name: 'complete', value: pct }, { name: 'remaining', value: 100 - pct }];
  return (
    <div className="fluid-gauge" style={{ width: size, height: size }} role="img" aria-label={`${current} of ${goal} milliliters logged`}>
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius="72%" outerRadius="88%" startAngle={90} endAngle={-270} stroke="none" isAnimationActive={false}>
            <Cell fill={palette.blue} />
            <Cell fill="#d8eaff" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="gauge-center"><FaDroplet /><strong>{current}</strong><span>of {goal} ml</span></div>
    </div>
  );
}

function FluidCard({ intake, goal, onAdd, onEdit }) {
  return (
    <Card>
      <SectionHeader title="Fluid Tracker" action="Edit Goal" onAction={onEdit} />
      <div className="fluid-card-content">
        <FluidGauge current={intake} goal={goal} />
        <div className="fluid-summary">
          <span>Today’s Intake</span><strong>{intake} ml</strong>
          <span>Remaining</span><strong className="blue-text">{Math.max(0, goal - intake)} ml</strong>
        </div>
      </div>
      <div className="fluid-tip"><FaDroplet /> <span>Tip: Spread your fluid intake throughout the day.</span></div>
      <button className="primary-button full" type="button" onClick={onAdd}>Add Fluid Intake</button>
    </Card>
  );
}

function ProgressBanner({ onNavigate }) {
  return (
    <section className="progress-banner">
      <span className="progress-icon"><FaGaugeHigh /></span>
      <div><strong>You’re doing great!</strong><p>Consistency is the key to better health.</p></div>
      <button type="button" onClick={() => onNavigate('health')}><FaChartColumn /> View My Progress</button>
    </section>
  );
}

function Dashboard({ medications, onToggleMedication, onNavigate, openModal, fluidIntake, fluidGoal }) {
  return (
    <div className="dashboard-layout page-enter">
      <div className="dashboard-top-grid">
        <HealthSummary onNavigate={onNavigate} />
        <TreatmentCard onNavigate={onNavigate} openModal={openModal} />
      </div>
      <div className="dashboard-row-grid dashboard-middle-grid">
        <MedicationsCard medications={medications} onToggle={onToggleMedication} onNavigate={onNavigate} openModal={openModal} />
        <QuickActions onNavigate={onNavigate} openModal={openModal} />
      </div>
      <div className="dashboard-row-grid dashboard-lower-grid">
        <EducationCard onNavigate={onNavigate} openModal={openModal} />
        <FluidCard intake={fluidIntake} goal={fluidGoal} onAdd={() => openModal('fluid')} onEdit={() => openModal('fluidGoal')} />
      </div>
      <ProgressBanner onNavigate={onNavigate} />
    </div>
  );
}

function StatPill({ icon: Icon, label, value, tone = 'teal' }) {
  return (
    <div className={classNames('stat-pill', `tone-${tone}`)}>
      <span><Icon /></span><div><small>{label}</small><strong>{value}</strong></div>
    </div>
  );
}

function HealthPage({ onNavigate, openModal }) {
  const bloodPressure = [
    { day: 'Mon', sys: 128, dia: 78 }, { day: 'Tue', sys: 130, dia: 80 }, { day: 'Wed', sys: 126, dia: 76 },
    { day: 'Thu', sys: 129, dia: 78 }, { day: 'Fri', sys: 124, dia: 75 }, { day: 'Sat', sys: 127, dia: 77 }, { day: 'Sun', sys: 125, dia: 76 },
  ];
  return (
    <div className="page-shell page-enter">
      <section className="health-hero">
        <div className="health-score">
          <div className="score-ring"><strong>72</strong><span>/100</span></div>
          <div><span className="eyebrow">Kidney Health Score</span><h2>Stable and on track</h2><p>Your medication adherence and blood pressure are helping. Phosphorus is the main item to watch.</p></div>
        </div>
        <div className="hero-actions">
          <button className="secondary-button" type="button" onClick={() => openModal('logVitals')}><FaHeartPulse /> Log vitals</button>
          <button className="primary-button" type="button" onClick={() => onNavigate('labs')}><FaFlaskVial /> View labs</button>
        </div>
      </section>
      <div className="stats-row">
        <StatPill icon={FaHeartPulse} label="Blood pressure" value="125/76" tone="pink" />
        <StatPill icon={FaWeightScale} label="Dry weight" value="74.2 kg" tone="purple" />
        <StatPill icon={FaDroplet} label="Fluid today" value="1,200 ml" tone="blue" />
        <StatPill icon={FaCapsules} label="Adherence" value="96%" tone="green" />
      </div>
      <div className="content-grid two-one">
        <Card>
          <SectionHeader title="Kidney Health Trends" action="Download Report" onAction={() => openModal('report')} />
          <div className="chart-legend"><span><i className="dot teal" /> eGFR</span><span><i className="dot orange" /> Phosphorus</span><span><i className="dot blue" /> Potassium</span></div>
          <div className="large-chart">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <LineChart data={trendData} margin={{ top: 12, right: 18, bottom: 0, left: -14 }}>
                <CartesianGrid stroke="#e8eef4" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#63718a', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#63718a', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #dde6ee', boxShadow: '0 10px 28px rgba(10,37,72,.08)' }} />
                <Line type="monotone" dataKey="egfr" stroke={palette.teal} strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="phosphorus" stroke={palette.orange} strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="potassium" stroke={palette.blue} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionHeader title="Care Priorities" />
          <div className="priority-list">
            <div className="priority-item alert"><FaCircleExclamation /><span><strong>Lower phosphorus</strong><small>Target under 4.5 mg/dL</small></span></div>
            <div className="priority-item success"><FaCircleCheck /><span><strong>Blood pressure controlled</strong><small>7-day average is in range</small></span></div>
            <div className="priority-item success"><FaCircleCheck /><span><strong>Medication adherence</strong><small>24 of 25 doses taken</small></span></div>
            <div className="priority-item info"><FaDroplet /><span><strong>Fluid goal</strong><small>300 ml remaining today</small></span></div>
          </div>
          <button className="card-footer-button" type="button" onClick={() => onNavigate('messages')}><FaMessage /> Ask your care team</button>
        </Card>
      </div>
      <Card>
        <SectionHeader title="Recent Blood Pressure" action="Log Reading" onAction={() => openModal('logVitals')} />
        <div className="medium-chart">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <AreaChart data={bloodPressure} margin={{ top: 10, right: 10, bottom: 0, left: -18 }}>
              <CartesianGrid stroke="#edf1f5" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis domain={[60, 140]} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="sys" stroke={palette.teal} fill="#e7f7f6" strokeWidth={3} />
              <Area type="monotone" dataKey="dia" stroke={palette.blue} fill="#edf6ff" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function TreatmentsPage({ openModal }) {
  const checklist = [
    { text: 'Bring medication list', done: true },
    { text: 'Pack headphones or a book', done: true },
    { text: 'Confirm transportation', done: false },
    { text: 'Review pre-treatment weight', done: false },
  ];
  const [items, setItems] = useState(checklist);
  return (
    <div className="page-shell page-enter">
      <div className="treatment-hero-grid">
        <Card className="next-treatment-hero">
          <span className="eyebrow">NEXT TREATMENT</span>
          <div className="treatment-hero-content">
            <div className="treatment-hero-icon"><FaPumpMedical /></div>
            <div><h2>Hemodialysis</h2><p>Tuesday, July 21 · 7:00–11:00 AM</p><p><FaLocationDot /> City Kidney Center, Station 4</p></div>
          </div>
          <div className="treatment-meta">
            <div><small>Arrival</small><strong>6:45 AM</strong></div>
            <div><small>Expected length</small><strong>4 hours</strong></div>
            <div><small>Transportation</small><strong>CareRide booked</strong></div>
          </div>
          <div className="button-row">
            <button className="primary-button" type="button" onClick={() => openModal('checkIn')}><FaCheck /> Start pre-check</button>
            <button className="secondary-button" type="button" onClick={() => openModal('directions')}><FaLocationDot /> Directions</button>
          </div>
        </Card>
        <Card>
          <SectionHeader title="Before You Go" />
          <div className="checklist">
            {items.map((item, index) => (
              <label key={item.text} className={classNames('check-row', item.done && 'checked')}>
                <input type="checkbox" checked={item.done} onChange={() => setItems((list) => list.map((entry, i) => i === index ? { ...entry, done: !entry.done } : entry))} />
                <span className="custom-check"><FaCheck /></span>
                <span>{item.text}</span>
              </label>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <SectionHeader title="Treatment Week" action="View Calendar" onAction={() => openModal('calendar')} />
        <div className="treatment-week">
          {weekTreatments.map((item) => (
            <button key={item.day} className={classNames('week-day', item.state)} type="button" onClick={() => item.state === 'treatment' && openModal('treatmentDay', item)}>
              <span>{item.day}</span><strong>{item.date}</strong><small>{item.label}</small>
            </button>
          ))}
        </div>
      </Card>
      <div className="content-grid one-one">
        <Card>
          <SectionHeader title="Access & Care Notes" action="Update" onAction={() => openModal('careNotes')} />
          <div className="detail-list">
            <div><FaHeartPulse /><span><small>Access</small><strong>Left forearm AV fistula</strong></span></div>
            <div><FaWeightScale /><span><small>Target dry weight</small><strong>74.0 kg</strong></span></div>
            <div><FaDroplet /><span><small>Last fluid removal</small><strong>2.1 L</strong></span></div>
            <div><FaUserDoctor /><span><small>Care lead</small><strong>Nurse Taylor</strong></span></div>
          </div>
        </Card>
        <Card>
          <SectionHeader title="Recent Treatment Summary" action="View Details" onAction={() => openModal('treatmentSummary')} />
          <div className="treatment-summary-row"><span>Session completed</span><strong>Jul 18 · 3h 58m</strong></div>
          <div className="treatment-summary-row"><span>Pre / post weight</span><strong>76.1 / 74.0 kg</strong></div>
          <div className="treatment-summary-row"><span>Average blood pressure</span><strong>128/76 mmHg</strong></div>
          <div className="treatment-summary-row"><span>Symptoms</span><strong>None reported</strong></div>
        </Card>
      </div>
    </div>
  );
}

function VascularAccessPage({ openModal }) {
  const [checks, setChecks] = useState({ thrill: true, skin: true, swelling: false });
  const toggle = (key) => setChecks((current) => ({ ...current, [key]: !current[key] }));
  const complete = Object.values(checks).filter(Boolean).length;
  return (
    <div className="page-shell page-enter">
      <section className="access-hero">
        <div className="access-hero-main"><span className="access-icon"><FaSyringe /></span><div><span className="eyebrow">ACTIVE ACCESS</span><h2>Left forearm AV fistula</h2><p>Created Mar 12, 2025 · In use · Last examined Jul 18, 2026</p></div></div>
        <div className="access-status"><span className="status-chip normal">Working well</span><strong>Strong thrill documented</strong><small>Next access review: Jul 25</small></div>
        <button className="primary-button" type="button" onClick={() => openModal('accessConcern')}><FaCircleExclamation /> Report a concern</button>
      </section>
      <div className="access-metrics">
        <Card><small>Access flow</small><strong>820 mL/min</strong><span className="trend-good"><FaArrowTrendUp /> Stable</span></Card>
        <Card><small>Venous pressure</small><strong>178 mmHg</strong><span>Within care target</span></Card>
        <Card><small>Last intervention</small><strong>Feb 08</strong><span>Fistulogram</span></Card>
        <Card><small>Access age</small><strong>16 months</strong><span>No catheter days</span></Card>
      </div>
      <div className="content-grid two-one">
        <Card>
          <SectionHeader title="Today’s Access Check" action={`${complete} of 3 complete`} />
          <p className="card-intro">Check before treatment and anytime the access feels different.</p>
          <div className="access-checklist">
            <button className={checks.thrill ? 'checked' : ''} onClick={() => toggle('thrill')}><span>{checks.thrill ? <FaCheck /> : null}</span><div><strong>I can feel the thrill</strong><small>A steady vibration is present over the access.</small></div></button>
            <button className={checks.skin ? 'checked' : ''} onClick={() => toggle('skin')}><span>{checks.skin ? <FaCheck /> : null}</span><div><strong>Skin looks normal</strong><small>No redness, warmth, drainage, or open areas.</small></div></button>
            <button className={checks.swelling ? 'checked' : ''} onClick={() => toggle('swelling')}><span>{checks.swelling ? <FaCheck /> : null}</span><div><strong>No new swelling or pain</strong><small>Hand and arm feel like usual.</small></div></button>
          </div>
          {!checks.thrill || !checks.skin || !checks.swelling ? <div className="access-alert"><FaCircleExclamation /><span><strong>Something changed?</strong><small>Contact your dialysis team now if the thrill is absent, bleeding will not stop, or you notice infection signs.</small></span></div> : <div className="scan-confidence"><FaCircleCheck /><span><strong>Daily check complete</strong><small>Your access check has been added to today’s care log.</small></span></div>}
        </Card>
        <Card>
          <SectionHeader title="Protect This Arm" />
          <div className="protection-list"><div><FaShieldHeart /><span><strong>No blood pressure cuffs</strong><small>Use the other arm.</small></span></div><div><FaDroplet /><span><strong>No blood draws or IVs</strong><small>Tell every clinician about your fistula.</small></span></div><div><FaSuitcaseMedical /><span><strong>Avoid pressure and heavy loads</strong><small>Do not sleep on or compress the access.</small></span></div></div>
          <button className="secondary-button full" type="button" onClick={() => openModal('accessCard')}><FaDownload /> Open access ID card</button>
        </Card>
      </div>
      <Card>
        <SectionHeader title="Access Care Timeline" action="Add record" onAction={() => openModal('accessRecord')} />
        <div className="care-timeline"><div className="complete"><i><FaCheck /></i><span><strong>Monthly access exam</strong><small>Jul 18 · Strong thrill and bruit; no prolonged bleeding</small></span><b>Complete</b></div><div><i><FaCalendarDays /></i><span><strong>Flow surveillance</strong><small>Jul 25 · During dialysis</small></span><b>Upcoming</b></div><div><i><FaUserDoctor /></i><span><strong>Vascular surgeon follow-up</strong><small>Sep 04 · City Vascular Center</small></span><b>Scheduled</b></div></div>
      </Card>
    </div>
  );
}

const transplantSteps = [
  { id: 1, title: 'Referral received', detail: 'Completed May 02', done: true },
  { id: 2, title: 'Education & consent', detail: 'Completed May 18', done: true },
  { id: 3, title: 'Medical evaluation', detail: 'In progress · 5 of 7 items', done: false, active: true },
  { id: 4, title: 'Selection committee', detail: 'Not scheduled', done: false },
  { id: 5, title: 'Waitlist decision', detail: 'Pending prerequisites', done: false },
];

function TransplantPage({ openModal, onNavigate }) {
  const [requirements, setRequirements] = useState([
    { id: 1, title: 'Transplant nephrologist visit', owner: 'Transplant Center', due: 'Completed Jun 09', done: true },
    { id: 2, title: 'Cardiac stress test', owner: 'Cardiology', due: 'Completed Jun 26', done: true },
    { id: 3, title: 'Dental clearance', owner: 'You', due: 'Due Jul 28', done: false },
    { id: 4, title: 'Colonoscopy report', owner: 'Primary Care', due: 'Requested', done: false },
    { id: 5, title: 'Social work evaluation', owner: 'Transplant Center', due: 'Aug 02', done: false },
    { id: 6, title: 'Financial authorization', owner: 'Insurance', due: 'In review', done: false },
    { id: 7, title: 'Treatment adherence review', owner: 'Kidney Center · 30-day record', due: '94% · On track', done: true, tracked: true },
  ]);
  const done = requirements.filter((item) => item.done).length;
  const percent = Math.round((done / requirements.length) * 100);
  const toggle = (id) => setRequirements((items) => items.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  return (
    <div className="page-shell page-enter">
      <section className="transplant-hero"><div><span className="eyebrow">TRANSPLANT PATHWAY</span><h2>Evaluation in progress</h2><p>You are completing prerequisites before your case can move to the selection committee.</p><div className="transplant-progress"><i style={{ width: `${percent}%` }} /><span>{percent}% prerequisites complete</span></div></div><span className="transplant-hero-icon"><FaHospital /></span><button className="primary-button" onClick={() => openModal('messageCoordinator')}><FaMessage /> Message coordinator</button></section>
      <Card>
        <SectionHeader title="Path to the Waitlist" action="How listing works" onAction={() => openModal('listingGuide')} />
        <div className="transplant-stepper">{transplantSteps.map((step) => <div key={step.id} className={classNames(step.done && 'complete', step.active && 'active')}><span>{step.done ? <FaCheck /> : step.id}</span><strong>{step.title}</strong><small>{step.detail}</small></div>)}</div>
      </Card>
      <div className="content-grid two-one">
        <Card>
          <SectionHeader title="Prerequisite Tracker" action={`${done} of ${requirements.length} complete`} />
          <div className="requirement-list">{requirements.map((item) => <button key={item.id} className={classNames(item.done && 'complete', item.tracked && 'tracked')} onClick={() => item.tracked ? onNavigate('treatments') : toggle(item.id)}><span>{item.done ? <FaCheck /> : null}</span><div><strong>{item.title}</strong><small>{item.owner}</small></div><b>{item.due}{item.tracked ? <FaChevronRight /> : null}</b></button>)}</div>
        </Card>
        <div className="page-shell compact-gap">
          <Card><SectionHeader title="Next Best Action" /><div className="next-action"><span><FaNotesMedical /></span><strong>Upload dental clearance</strong><p>Your dental appointment is complete, but the clearance document is still needed.</p><button className="primary-button full" onClick={() => openModal('scan', { category: 'document' })}><FaUpload /> Upload clearance</button></div></Card>
          <Card><SectionHeader title="Transplant Team" /><div className="care-availability"><span className="avatar-initials">AR</span><div><strong>Ana Ruiz, RN</strong><small>Transplant coordinator · Replies in 1 business day</small></div></div><button className="secondary-button full" onClick={() => openModal('call')}><FaPhone /> Call transplant center</button></Card>
        </div>
      </div>
      <Card className="adherence-readiness-card">
        <div className="adherence-readiness-head">
          <div><span className="eyebrow">LISTING READINESS EVIDENCE</span><h3>Treatment adherence</h3><p>Your care record shows how consistently you follow the treatment plan. The transplant team may review this alongside your medical and support evaluations.</p></div>
          <div className="adherence-score" aria-label="Treatment adherence score: 94 percent"><strong>94%</strong><span>On track</span></div>
        </div>
        <div className="adherence-evidence-grid">
          <div><span><FaPumpMedical /></span><small>Dialysis attendance</small><strong>12 of 12</strong><b className="trend-good"><FaCircleCheck /> Complete</b></div>
          <div><span><FaCapsules /></span><small>Medication doses</small><strong>96%</strong><b className="trend-good"><FaArrowTrendUp /> Improving</b></div>
          <div><span><FaCalendarDays /></span><small>Care appointments</small><strong>4 of 4</strong><b className="trend-good"><FaCircleCheck /> Complete</b></div>
          <div><span><FaDroplet /></span><small>Fluid goal days</small><strong>25 of 30</strong><b>5 days over goal</b></div>
        </div>
        <div className="adherence-readiness-foot"><span><FaCircleInfo /> Updated from your myKIT records today. Your transplant team makes the final assessment.</span><button className="secondary-button" type="button" onClick={() => onNavigate('treatments')}>View treatment record <FaArrowRight /></button></div>
      </Card>
      <Card><SectionHeader title="Documents & Decisions" action="View all" onAction={() => openModal('documents')} /><div className="document-tracker"><div><FaFileLines /><span><strong>Evaluation summary</strong><small>Updated Jul 16</small></span><b className="status-chip normal">Received</b></div><div><FaHeartPulse /><span><strong>Cardiac clearance</strong><small>Received Jun 28</small></span><b className="status-chip normal">Cleared</b></div><div><FaShieldHeart /><span><strong>Insurance authorization</strong><small>Submitted Jul 12</small></span><b className="status-chip scheduled">In review</b></div></div></Card>
    </div>
  );
}

function InsightsHub({ onNavigate, openModal }) {
  return (
    <div className="page-shell page-enter">
      <section className="kit-hub-hero insights"><span className="kit-hub-letter">I</span><div><span className="eyebrow">myINSIGHTS</span><h2>See what is happening—and why it matters</h2><p>Reports turn labs, treatments, medications, nutrition, and access data into a clearer picture of your kidney health.</p></div><button className="primary-button" onClick={() => openModal('report')}><FaDownload /> Latest health report</button></section>
      <div className="insight-callout"><FaCircleInfo /><div><strong>Your phosphorus improved, but remains above target</strong><p>It moved from 5.6 to 5.2 mg/dL. Taking your binder with the first bites of each meal may help.</p></div><button onClick={() => onNavigate('labs')}>See the evidence <FaArrowRight /></button></div>
      <div className="insight-card-grid">
        <Card><span className="insight-card-icon teal"><FaHeartPulse /></span><span className="eyebrow">REPORT</span><h3>30-Day Health Summary</h3><p>Kidney function, blood pressure, weight, symptoms, and adherence in one report.</p><footer><span>Updated today</span><button onClick={() => onNavigate('health')}>Open report <FaArrowRight /></button></footer></Card>
        <Card><span className="insight-card-icon orange"><FaFlaskVial /></span><span className="eyebrow">DEEP DIVE</span><h3>Lab Results Explained</h3><p>Understand what changed, what is in range, and what to discuss with your care team.</p><footer><span>6 recent tests</span><button onClick={() => onNavigate('labs')}>Explore labs <FaArrowRight /></button></footer></Card>
        <Card><span className="insight-card-icon blue"><FaSuitcaseMedical /></span><span className="eyebrow">PATTERN</span><h3>Treatment & Fluid</h3><p>See how fluid gains, blood pressure, symptoms, and dialysis sessions connect.</p><footer><span>7 sessions analyzed</span><button onClick={() => onNavigate('health')}>View pattern <FaArrowRight /></button></footer></Card>
      </div>
      <Card><SectionHeader title="What Changed This Week" /><div className="change-grid"><div><span className="trend-good"><FaArrowTrendUp /></span><strong>Phosphorus</strong><b>−0.4 mg/dL</b><small>Moving toward target</small></div><div><span><FaDroplet /></span><strong>Average fluid</strong><b>1,366 mL</b><small>91% of daily goal</small></div><div><span><FaCapsules /></span><strong>Medication adherence</strong><b>96%</b><small>Up 4% from last week</small></div><div><span><FaSyringe /></span><strong>Access checks</strong><b>6 of 7</b><small>One daily check missed</small></div></div></Card>
    </div>
  );
}

function ToolsHub({ onNavigate, openModal }) {
  const tools = kitSections[2].items.filter((item) => !['tools', 'support', 'settings'].includes(item.id));
  return (
    <div className="page-shell page-enter">
      <section className="kit-hub-hero tools"><span className="kit-hub-letter">T</span><div><span className="eyebrow">myTOOLS</span><h2>Your everyday kidney-care toolkit</h2><p>Log, plan, scan, learn, and connect—without searching through one long menu.</p></div><button className="primary-button" onClick={() => openModal('quickLog')}><FaPlus /> Quick add</button></section>
      <div className="tool-grid">{tools.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onNavigate(id)}><span><Icon /></span><strong>{label}</strong><small>{pageSubtitle(id)}</small><FaChevronRight /></button>)}</div>
      <ScanBanner icon={FaCamera} title="Turn a photo or document into an update" text="Scan a medication card, lab report, food label, or care document and verify the transcription before saving." onScan={() => openModal('scan', { category: 'medication' })} />
    </div>
  );
}

function MedicationsPage({ medications, onToggle, openModal }) {
  const dueCount = medications.filter((m) => m.status === 'due').length;
  return (
    <div className="page-shell page-enter">
      <ScanBanner icon={FaCapsules} title="Update medications from a card or document" text="Photograph a medication card, bottle label, or discharge list—or upload the file—then verify the detected changes." onScan={() => openModal('scan', { category: 'medication' })} />
      <div className="medication-summary-bar">
        <div><span className="summary-icon"><FaCapsules /></span><div><small>Today’s adherence</small><strong>{Math.round(((medications.length - dueCount) / medications.length) * 100)}%</strong></div></div>
        <div><small>Doses completed</small><strong>{medications.length - dueCount} of {medications.length}</strong></div>
        <div><small>Next dose</small><strong>{dueCount ? '8:00 PM' : 'All done'}</strong></div>
        <button className="primary-button" type="button" onClick={() => openModal('addMedication')}><FaPlus /> Add Medication</button>
      </div>
      <Card>
        <SectionHeader title="Today’s Schedule" action="Manage Reminders" onAction={() => openModal('reminder')} />
        <div className="medication-table">
          <div className="table-header"><span>Medication</span><span>Instructions</span><span>Time</span><span>Status</span><span /></div>
          {medications.map((med) => {
            const Icon = med.icon;
            return (
              <div className="table-row" key={med.id}>
                <span className="table-med"><i><Icon /></i><strong>{med.name}</strong></span>
                <span>{med.instructions}</span>
                <span>{med.time}</span>
                <span><b className={classNames('status-chip', med.status)}>{med.status === 'taken' ? 'Taken' : med.status === 'due' ? 'Due today' : 'Scheduled'}</b></span>
                <span><button className="small-action" type="button" onClick={() => med.status === 'due' ? onToggle(med.id) : openModal('medication', med)}>{med.status === 'due' ? 'Mark taken' : 'Details'}</button></span>
              </div>
            );
          })}
        </div>
      </Card>
      <div className="content-grid two-one">
        <Card>
          <SectionHeader title="7-Day Adherence" />
          <div className="adherence-days">
            {['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'].map((day, index) => (
              <div key={day} className={classNames('adherence-day', index < 6 && 'complete', index === 6 && dueCount === 0 && 'complete')}><span>{day}</span><i>{index < 6 || dueCount === 0 ? <FaCheck /> : dueCount}</i></div>
            ))}
          </div>
          <div className="summary-note"><FaShieldHeart /> You’ve taken 24 of 25 scheduled doses this week.</div>
        </Card>
        <Card>
          <SectionHeader title="Medication Safety" />
          <div className="safety-note"><FaCircleInfo /><span><strong>Bring an updated list</strong><small>Show this medication list at every appointment.</small></span></div>
          <div className="safety-note"><FaCircleExclamation /><span><strong>Avoid NSAIDs</strong><small>Check with your care team before taking ibuprofen or naproxen.</small></span></div>
          <button className="card-footer-button" type="button" onClick={() => openModal('medicationList')}><FaDownload /> Download medication list</button>
        </Card>
      </div>
    </div>
  );
}

function DietPage({ openModal, scannedFoods }) {
  const [query, setQuery] = useState('');
  const foods = [
    { name: 'Blueberries', note: 'Kidney-friendly portion', potassium: 'Low', phosphorus: 'Low', tone: 'green' },
    { name: 'White rice', note: '1/2 cup cooked', potassium: 'Low', phosphorus: 'Low', tone: 'green' },
    { name: 'Bell peppers', note: '1/2 cup sliced', potassium: 'Low', phosphorus: 'Low', tone: 'green' },
    { name: 'Banana', note: 'Limit or swap', potassium: 'High', phosphorus: 'Low', tone: 'orange' },
  ].filter((food) => food.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="page-shell page-enter">
      <ScanBanner icon={FaAppleWhole} title="Log a meal from a photo" text="Photograph a plate, package, or nutrition label. Review the detected food and nutrients before adding it." onScan={() => openModal('scan', { category: 'food' })} />
      <div className="nutrition-targets">
        <Card><span className="target-icon green"><FaAppleWhole /></span><small>Sodium</small><strong>1,240 / 2,000 mg</strong><div className="progress-track"><i style={{ width: '62%' }} /></div></Card>
        <Card><span className="target-icon orange"><FaFlaskVial /></span><small>Phosphorus</small><strong>820 / 1,000 mg</strong><div className="progress-track orange"><i style={{ width: '82%' }} /></div></Card>
        <Card><span className="target-icon blue"><FaDroplet /></span><small>Fluid</small><strong>1,200 / 1,500 ml</strong><div className="progress-track blue"><i style={{ width: '80%' }} /></div></Card>
        <Card><span className="target-icon purple"><FaUtensils /></span><small>Protein</small><strong>48 / 65 g</strong><div className="progress-track purple"><i style={{ width: '74%' }} /></div></Card>
      </div>
      <div className="content-grid two-one">
        <Card>
          <SectionHeader title="Today’s Meal Plan" action="Edit Plan" onAction={() => openModal('mealPlan')} />
          <div className="meal-list">
            <div><span className="meal-time">Breakfast</span><i><FaKitchenSet /></i><span><strong>Egg-white toast & berries</strong><small>320 kcal · 210 mg sodium</small></span><button onClick={() => openModal('meal', { name: 'Breakfast' })}><FaPen /></button></div>
            <div><span className="meal-time">Lunch</span><i><FaUtensils /></i><span><strong>Grilled chicken rice bowl</strong><small>510 kcal · 420 mg sodium</small></span><button onClick={() => openModal('meal', { name: 'Lunch' })}><FaPen /></button></div>
            <div><span className="meal-time">Dinner</span><i><FaAppleWhole /></i><span><strong>Herb fish, couscous & green beans</strong><small>470 kcal · 390 mg sodium</small></span><button onClick={() => openModal('meal', { name: 'Dinner' })}><FaPen /></button></div>
          </div>
          <button className="card-footer-button" type="button" onClick={() => openModal('logFood')}><FaPlus /> Log food or drink</button>
        </Card>
        <Card>
          <SectionHeader title="Dietitian Tip" />
          <div className="dietitian-tip"><span className="avatar-initials">MC</span><div><strong>Melissa Chen, RD</strong><p>Rinse canned vegetables and beans to remove some sodium. Choose lower-sodium labels when available.</p></div></div>
          <button className="secondary-button full" type="button" onClick={() => openModal('messageDietitian')}><FaMessage /> Message Melissa</button>
        </Card>
      </div>
      <Card>
        <SectionHeader title="Food Guide" action="View All Foods" onAction={() => openModal('foodGuide')} />
        <label className="search-field"><FaMagnifyingGlass /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search foods" /></label>
        <div className="food-grid">
          {foods.map((food) => (
            <button key={food.name} type="button" className="food-item" onClick={() => openModal('food', food)}><span className={classNames('food-dot', food.tone)}><FaAppleWhole /></span><span><strong>{food.name}</strong><small>{food.note}</small></span><span className="food-nutrients"><small>K: {food.potassium}</small><small>P: {food.phosphorus}</small></span><FaChevronRight /></button>
          ))}
          {foods.length === 0 ? <div className="empty-state"><FaMagnifyingGlass /><strong>No matching foods</strong><p>Try a broader search term.</p></div> : null}
        </div>
      </Card>
      {scannedFoods.length ? <Card><SectionHeader title="Recent Photo Imports" /><div className="scan-import-list">{scannedFoods.map((food) => <div key={food.id}><span className="scan-result-icon"><FaCamera /></span><span><strong>{food.name}</strong><small>{food.portion} · {food.sodium} sodium · {food.potassium} potassium</small></span><b className="status-chip normal">Added</b></div>)}</div></Card> : null}
    </div>
  );
}

function FluidPage({ intake, goal, setIntake, openModal }) {
  const [selected, setSelected] = useState(240);
  const add = () => setIntake((value) => Math.min(goal + 500, value + selected));
  return (
    <div className="page-shell page-enter">
      <div className="fluid-page-hero">
        <Card className="fluid-total-card">
          <SectionHeader title="Today’s Fluid" action="Edit Goal" onAction={() => openModal('fluidGoal')} />
          <div className="fluid-total-layout"><FluidGauge current={intake} goal={goal} size={240} /><div className="fluid-big-summary"><span>Remaining today</span><strong>{Math.max(0, goal - intake)} ml</strong><p>Your daily target is {goal.toLocaleString()} ml. Small sips throughout the day can make the goal easier.</p></div></div>
        </Card>
        <Card>
          <SectionHeader title="Quick Add" />
          <div className="quick-amounts">
            {[120, 240, 350, 500].map((amount) => <button key={amount} className={selected === amount ? 'selected' : ''} type="button" onClick={() => setSelected(amount)}><FaGlassWater /><strong>{amount} ml</strong><small>{amount === 240 ? '1 cup' : amount === 500 ? '1 bottle' : 'custom'}</small></button>)}
          </div>
          <button className="primary-button full" type="button" onClick={add}><FaPlus /> Add {selected} ml</button>
          <button className="text-button centered" type="button" onClick={() => openModal('fluid')}>Enter a different amount</button>
        </Card>
      </div>
      <div className="content-grid two-one">
        <Card>
          <SectionHeader title="7-Day Fluid History" action="Export" onAction={() => openModal('report')} />
          <div className="large-chart">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={fluidHistory.map((entry, index) => index === fluidHistory.length - 1 ? { ...entry, amount: intake } : entry)} margin={{ top: 12, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid stroke="#edf1f5" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 1800]} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="amount" fill={palette.blue} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionHeader title="Today’s Log" />
          <div className="timeline-list">
            <div><i><FaGlassWater /></i><span><strong>Water</strong><small>8:15 AM</small></span><b>240 ml</b></div>
            <div><i><FaUtensils /></i><span><strong>Coffee</strong><small>9:40 AM</small></span><b>180 ml</b></div>
            <div><i><FaKitchenSet /></i><span><strong>Soup at lunch</strong><small>12:25 PM</small></span><b>300 ml</b></div>
            <div><i><FaGlassWater /></i><span><strong>Water</strong><small>3:10 PM</small></span><b>{Math.max(0, intake - 720)} ml</b></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AppointmentsPage({ openModal }) {
  return (
    <div className="page-shell page-enter">
      <div className="page-toolbar">
        <div className="segmented"><button className="active" type="button">Upcoming</button><button type="button">Past</button></div>
        <button className="primary-button" type="button" onClick={() => openModal('appointment')}><FaPlus /> Request Appointment</button>
      </div>
      <Card>
        <SectionHeader title="Upcoming Appointments" />
        <div className="appointments-list">
          {appointments.map((appointment, index) => (
            <div className="appointment-card" key={appointment.id}>
              <div className="date-tile"><span>{appointment.month}</span><strong>{appointment.day}</strong></div>
              <div className="appointment-main"><span className="eyebrow">{index === 0 ? 'TOMORROW' : appointment.type.toUpperCase()}</span><h3>{appointment.title}</h3><p>{appointment.clinician}</p><div><span><FaClock /> {appointment.time}</span><span><FaLocationDot /> {appointment.type}</span></div></div>
              <div className="appointment-actions"><button className="secondary-button" type="button" onClick={() => openModal('appointmentDetails', appointment)}>Details</button><button className="icon-button" type="button" onClick={() => openModal('appointmentOptions', appointment)} aria-label="Appointment options"><FaEllipsisVertical /></button></div>
            </div>
          ))}
        </div>
      </Card>
      <div className="content-grid one-one">
        <Card>
          <SectionHeader title="Visit Preparation" />
          <div className="preparation-list"><div><FaNotesMedical /><span><strong>Questions for your nephrologist</strong><small>2 questions saved</small></span><button onClick={() => openModal('questions')}>Review</button></div><div><FaCapsules /><span><strong>Medication list</strong><small>Updated Jul 18</small></span><button onClick={() => openModal('medicationList')}>Open</button></div><div><FaFlaskVial /><span><strong>Latest lab report</strong><small>6 results available</small></span><button onClick={() => openModal('report')}>Open</button></div></div>
        </Card>
        <Card>
          <SectionHeader title="Care Team Availability" action="Message Team" onAction={() => openModal('messageCareTeam')} />
          <div className="care-availability"><span className="avatar-initials">SJ</span><div><strong>Dr. Sarah Johnson</strong><small>Next available: Jul 23, 10:30 AM</small></div></div>
          <div className="care-availability"><span className="avatar-initials green">MC</span><div><strong>Melissa Chen, RD</strong><small>Next available: Jul 27, 2:00 PM</small></div></div>
        </Card>
      </div>
    </div>
  );
}

function LabsPage({ openModal, labs }) {
  const [filter, setFilter] = useState('all');
  const visible = labs.filter((row) => filter === 'all' || row.status === filter);
  return (
    <div className="page-shell page-enter">
      <ScanBanner icon={FaFlaskVial} title="Import a lab report" text="Take a clear photo of every page. myKIT will separate tests, values, units, ranges, and collection dates for your review." onScan={() => openModal('scan', { category: 'lab' })} />
      <div className="lab-summary-strip"><div><span className="summary-icon"><FaFlaskVial /></span><div><small>Latest panel</small><strong>July 18, 2026</strong></div></div><div><small>Results</small><strong>{labs.length} tests</strong></div><div><small>Needs attention</small><strong className="red-text">{labs.filter((row) => row.status !== 'normal').length} results</strong></div><button className="secondary-button" type="button" onClick={() => openModal('report')}><FaDownload /> Download PDF</button></div>
      <Card>
        <div className="table-toolbar"><div className="filter-pills"><button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button><button className={filter === 'high' ? 'active' : ''} onClick={() => setFilter('high')}>High</button><button className={filter === 'low' ? 'active' : ''} onClick={() => setFilter('low')}>Low</button><button className={filter === 'normal' ? 'active' : ''} onClick={() => setFilter('normal')}>Normal</button></div><button className="icon-text-button" type="button"><FaFilter /> Filter</button></div>
        <div className="lab-table">
          <div className="table-header"><span>Test</span><span>Current</span><span>Previous</span><span>Reference Range</span><span>Status</span><span /></div>
          {visible.map((row) => (
            <button className="table-row" key={row.test} type="button" onClick={() => openModal('lab', row)}>
              <span><strong>{row.test}</strong><small>{row.date}</small></span>
              <span><strong>{row.current}</strong><small>{row.unit}</small></span>
              <span>{row.previous}</span><span>{row.range}</span><span><b className={classNames('status-chip', row.status)}>{row.status}</b></span><span><FaChevronRight /></span>
            </button>
          ))}
        </div>
      </Card>
      <Card>
        <SectionHeader title="Lab Trend Overview" action="Print" onAction={() => window.print()} />
        <div className="large-chart">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <LineChart data={trendData} margin={{ top: 10, right: 20, bottom: 0, left: -15 }}><CartesianGrid stroke="#edf1f5" vertical={false} /><XAxis dataKey="date" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Line type="monotone" dataKey="phosphorus" stroke={palette.red} strokeWidth={3} /><Line type="monotone" dataKey="potassium" stroke={palette.orange} strokeWidth={3} /></LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function EducationPage({ openModal }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const items = educationArticles.filter((article) => (category === 'All' || article.category === category) && article.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="page-shell page-enter">
      <section className="education-hero"><div><span className="eyebrow">RECOMMENDED FOR YOU</span><h2>Understand your treatment, one step at a time</h2><p>Short, trusted lessons chosen for your care plan.</p><button className="primary-button" type="button" onClick={() => openModal('article', educationArticles[2])}><FaPlay /> Continue learning</button></div><span className="education-hero-icon"><FaBookOpen /></span></section>
      <div className="education-toolbar"><label className="search-field"><FaMagnifyingGlass /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search education" /></label><div className="filter-pills">{['All', 'Nutrition', 'Lifestyle', 'Treatment'].map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
      <div className="article-grid">
        {items.map((article) => <button type="button" className="article-card" key={article.id} onClick={() => openModal('article', article)}><img src={article.image} alt="" /><span className="article-category">{article.category}</span><h3>{article.title}</h3><p>{article.subtitle}</p><footer><span>{article.length}</span><FaArrowRight /></footer></button>)}
      </div>
      <Card><SectionHeader title="Learning Paths" /><div className="learning-paths"><button onClick={() => openModal('learningPath', { name: 'Starting Dialysis' })}><span><FaSuitcaseMedical /></span><div><strong>Starting Dialysis</strong><small>3 of 5 lessons complete</small><div className="progress-track"><i style={{ width: '60%' }} /></div></div><FaChevronRight /></button><button onClick={() => openModal('learningPath', { name: 'Kidney-Friendly Eating' })}><span><FaAppleWhole /></span><div><strong>Kidney-Friendly Eating</strong><small>1 of 4 lessons complete</small><div className="progress-track green"><i style={{ width: '25%' }} /></div></div><FaChevronRight /></button></div></Card>
    </div>
  );
}

function MessagesPage({ messages, setMessages, openModal }) {
  const [activeThread, setActiveThread] = useState(careThreads[0]);
  const [draft, setDraft] = useState('');
  const messagesEnd = useRef(null);
  const send = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((list) => [...list, { id: Date.now(), sender: 'me', text, time: 'Just now' }]);
    setDraft('');
  };
  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  return (
    <div className="message-layout page-enter">
      <Card className="thread-panel">
        <div className="thread-header"><h2>Care Team</h2><button className="icon-button" type="button" onClick={() => openModal('newMessage')} aria-label="Start new message"><FaPen /></button></div>
        <label className="search-field small"><FaMagnifyingGlass /><input placeholder="Search messages" /></label>
        <div className="thread-list">{careThreads.map((thread) => <button key={thread.id} className={activeThread.id === thread.id ? 'active' : ''} onClick={() => setActiveThread(thread)}><span className="avatar-initials">{thread.initials}</span><span><strong>{thread.name}</strong><small>{thread.preview}</small></span><span className="thread-meta"><small>{thread.time}</small>{thread.unread ? <b>{thread.unread}</b> : null}</span></button>)}</div>
      </Card>
      <Card className="chat-panel">
        <header className="chat-header"><div><span className="avatar-initials">{activeThread.initials}</span><span><strong>{activeThread.name}</strong><small>{activeThread.role}</small></span></div><button className="secondary-button compact" type="button" onClick={() => openModal('careProfile', activeThread)}><FaCircleInfo /> Details</button></header>
        <div className="chat-messages"><div className="chat-date">Today</div><div className="message-bubble theirs"><p>Hi John, I reviewed your latest labs. Your potassium is still in range, and your eGFR is stable.</p><span>9:40 AM</span></div><div className="message-bubble theirs"><p>Your phosphorus is a little high. Please keep taking sevelamer with meals and review the food guide Melissa shared.</p><span>9:42 AM</span></div>{messages.map((message) => <div key={message.id} className={classNames('message-bubble', message.sender === 'me' ? 'mine' : 'theirs')}><p>{message.text}</p><span>{message.time}</span></div>)}<div ref={messagesEnd} /></div>
        <form className="message-composer" onSubmit={send}><button className="icon-button" type="button" onClick={() => openModal('attachment')} aria-label="Add attachment"><FaPlus /></button><input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a message" aria-label="Message" /><button className="send-button" type="submit" aria-label="Send message"><FaPaperPlane /></button></form>
      </Card>
    </div>
  );
}

function SupportPage({ onNavigate, openModal }) {
  const [openFaq, setOpenFaq] = useState(0);
  const faqs = [
    ['What should I do if I miss a dialysis session?', 'Call your dialysis center right away. Your care team will tell you whether the session should be rescheduled and what symptoms to monitor.'],
    ['When should I call about swelling or shortness of breath?', 'Contact your care team promptly for new or worsening swelling, breathing difficulty, chest discomfort, or rapid weight gain. For severe symptoms, seek emergency care.'],
    ['How do I reset a medication reminder?', 'Open Medications, choose Manage Reminders, and update the time or notification preference.'],
  ];
  return (
    <div className="page-shell page-enter">
      <section className="support-hero"><span><FaHeadset /></span><div><h2>How can we help?</h2><p>Your care team and myKIT support are here for you.</p></div></section>
      <div className="support-options">
        <Card><span className="support-option-icon teal"><FaMessage /></span><h3>Message Care Team</h3><p>Questions about symptoms, medications, diet, or treatment.</p><button className="primary-button full" type="button" onClick={() => onNavigate('messages')}>Open Messages</button></Card>
        <Card><span className="support-option-icon blue"><FaPhone /></span><h3>Call Kidney Center</h3><p>For same-day treatment coordination and scheduling.</p><button className="secondary-button full" type="button" onClick={() => openModal('call')}>1-800-123-5434</button></Card>
        <Card><span className="support-option-icon purple"><FaShieldHeart /></span><h3>myKIT Support</h3><p>Help with sign-in, notifications, or using the app.</p><button className="secondary-button full" type="button" onClick={() => openModal('supportTicket')}>Contact Support</button></Card>
      </div>
      <Card><SectionHeader title="Frequently Asked Questions" /><div className="faq-list">{faqs.map(([question, answer], index) => <div key={question} className={openFaq === index ? 'open' : ''}><button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><FaChevronDown /></button>{openFaq === index ? <p>{answer}</p> : null}</div>)}</div></Card>
      <div className="urgent-note"><FaCircleExclamation /><div><strong>Need urgent medical help?</strong><p>myKIT is not for emergencies. Call your local emergency number for severe chest pain, trouble breathing, confusion, or loss of consciousness.</p></div></div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return <label className="toggle-row"><span><strong>{label}</strong><small>{description}</small></span><button type="button" className={classNames('toggle', checked && 'on')} onClick={() => onChange(!checked)} role="switch" aria-checked={checked}><i /></button></label>;
}

function SettingsPage({ openModal }) {
  const [preferences, setPreferences] = useState({ meds: true, appointments: true, lab: true, education: false, biometric: true });
  const update = (key) => (value) => setPreferences((state) => ({ ...state, [key]: value }));
  return (
    <div className="page-shell page-enter">
      <Card className="profile-card"><img src="/assets/john-avatar.jpg" alt="John" /><div><h2>John Doe</h2><p>Patient ID: KIT-12345678</p><span>City Kidney Center</span></div><button className="secondary-button" type="button" onClick={() => openModal('editProfile')}><FaPen /> Edit Profile</button></Card>
      <div className="settings-grid">
        <Card><SectionHeader title="Notifications" /><ToggleRow label="Medication reminders" description="Dose alerts and missed-dose follow-ups" checked={preferences.meds} onChange={update('meds')} /><ToggleRow label="Appointment reminders" description="24-hour and 2-hour alerts" checked={preferences.appointments} onChange={update('appointments')} /><ToggleRow label="New lab results" description="Notify when results are ready" checked={preferences.lab} onChange={update('lab')} /><ToggleRow label="Education suggestions" description="Personalized learning recommendations" checked={preferences.education} onChange={update('education')} /></Card>
        <Card><SectionHeader title="Privacy & Security" /><ToggleRow label="Biometric sign-in" description="Use Face ID or fingerprint on supported devices" checked={preferences.biometric} onChange={update('biometric')} /><button className="settings-link" type="button" onClick={() => openModal('password')}><FaLock /><span><strong>Change password</strong><small>Last updated 62 days ago</small></span><FaChevronRight /></button><button className="settings-link" type="button" onClick={() => openModal('privacy')}><FaShieldHeart /><span><strong>Privacy permissions</strong><small>Manage data sharing and consent</small></span><FaChevronRight /></button><button className="settings-link" type="button" onClick={() => openModal('devices')}><FaSliders /><span><strong>Connected devices</strong><small>2 active devices</small></span><FaChevronRight /></button></Card>
        <Card><SectionHeader title="Preferences" /><button className="settings-link" type="button" onClick={() => openModal('units')}><FaGaugeHigh /><span><strong>Units</strong><small>Metric (kg, mL)</small></span><FaChevronRight /></button><button className="settings-link" type="button" onClick={() => openModal('language')}><FaBookOpen /><span><strong>Language</strong><small>English</small></span><FaChevronRight /></button><button className="settings-link" type="button" onClick={() => openModal('accessibility')}><FaHeart /><span><strong>Accessibility</strong><small>Text size, contrast, motion</small></span><FaChevronRight /></button></Card>
        <Card><SectionHeader title="Data & Documents" /><button className="settings-link" type="button" onClick={() => openModal('export')}><FaDownload /><span><strong>Export my data</strong><small>Download a portable copy</small></span><FaChevronRight /></button><button className="settings-link" type="button" onClick={() => openModal('documents')}><FaFileLines /><span><strong>Shared documents</strong><small>8 care documents</small></span><FaChevronRight /></button><button className="settings-link danger" type="button" onClick={() => openModal('signOut')}><FaXmark /><span><strong>Sign out</strong><small>End this session securely</small></span><FaChevronRight /></button></Card>
      </div>
    </div>
  );
}

function BottomNav({ activePage, onNavigate, openModal }) {
  const activeKit = kitForPage(activePage);
  const items = [
    { id: 'kidney', label: 'myKidney', icon: FaHeartPulse, target: 'home' },
    { id: 'insights', label: 'myInsights', icon: FaChartColumn, target: 'insights' },
    { id: 'add', label: 'Add Log', icon: FaPlus, center: true },
    { id: 'tools', label: 'myTools', icon: FaSliders, target: 'tools' },
    { id: 'more', label: 'More', icon: FaEllipsisVertical },
  ];
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {items.map(({ id, label, icon: Icon, center, target }) => (
        <button className={classNames(center && 'center-action', activeKit.id === id && 'active')} key={id} type="button" onClick={() => id === 'add' ? openModal('quickLog') : id === 'more' ? openModal('more') : onNavigate(target)}>
          <span><Icon /></span><small>{label}</small>
        </button>
      ))}
    </nav>
  );
}

const scanTemplates = {
  medication: {
    label: 'Medication card', icon: FaCapsules,
    fields: { name: 'Amlodipine 10 mg', instructions: '1 tablet once daily', time: '8:00 PM', prescriber: 'Dr. Sarah Johnson' },
  },
  lab: {
    label: 'Lab report', icon: FaFlaskVial,
    fields: { collected: '2026-07-20', facility: 'City Kidney Center', items: [
      { test: 'Potassium', current: '4.6', unit: 'mmol/L', range: '3.5–5.1', status: 'normal' },
      { test: 'Phosphorus', current: '5.2', unit: 'mg/dL', range: '2.5–4.5', status: 'high' },
      { test: 'Hemoglobin', current: '10.4', unit: 'g/dL', range: '12.0–16.0', status: 'low' },
    ] },
  },
  food: {
    label: 'Food or nutrition label', icon: FaAppleWhole,
    fields: { name: 'Grilled chicken rice bowl', portion: '1 bowl', calories: '510 kcal', sodium: '420 mg', potassium: '510 mg', phosphorus: '280 mg' },
  },
  document: {
    label: 'Care document', icon: FaFileLines,
    fields: { title: 'Dental clearance', provider: 'Riverside Dental Group', documentDate: '2026-07-20', category: 'Transplant prerequisite', status: 'Cleared' },
  },
};

function ScanImport({ category, onCancel, onApply }) {
  const config = scanTemplates[category] || scanTemplates.medication;
  const Icon = config.icon;
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [stage, setStage] = useState('choose');
  const [fields, setFields] = useState(config.fields);

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);
  const chooseFile = (event) => {
    const next = event.target.files?.[0];
    if (!next) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(next);
    setPreview(next.type.startsWith('image/') ? URL.createObjectURL(next) : '');
    setStage('reading');
    window.setTimeout(() => setStage('review'), 900);
  };
  const setField = (key, value) => setFields((current) => ({ ...current, [key]: value }));
  const setLabField = (index, key, value) => setFields((current) => ({ ...current, items: current.items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item) }));

  return (
    <div className="scan-workflow">
      {stage === 'choose' ? <>
        <div className="scan-intro"><span><Icon /></span><h3>Add a {config.label.toLowerCase()}</h3><p>Use your camera or select a photo, PDF, Word document, or text file. You’ll review every detected field before it updates myKIT.</p></div>
        <div className="scan-source-grid">
          <label className="scan-source"><FaCamera /><strong>Take a photo</strong><small>Use the rear camera for clearer text</small><input type="file" accept="image/*" capture="environment" onChange={chooseFile} /></label>
          <label className="scan-source"><FaUpload /><strong>Upload a file</strong><small>Photo, PDF, Word, or text</small><input type="file" accept="image/*,.pdf,.doc,.docx,.txt,.rtf" onChange={chooseFile} /></label>
        </div>
        <div className="info-box"><FaShieldHeart /> Files stay in this prototype session. A production version should encrypt uploads, restrict access, and keep an audit history.</div>
      </> : null}
      {stage === 'reading' ? <div className="scan-reading"><span className="scan-spinner"><FaCamera /></span><h3>Reading {file?.name}</h3><p>Finding names, values, units, dates, and instructions…</p></div> : null}
      {stage === 'review' ? <>
        <div className="scan-review-head">
          {preview ? <img src={preview} alt="Uploaded document preview" /> : <span className="document-preview"><FaFileLines /></span>}
          <div><span className="eyebrow">READY TO REVIEW</span><h3>{file?.name}</h3><p>Check the transcription against the original before saving.</p></div>
        </div>
        {category === 'lab' ? <div className="scan-lab-review">
          <div className="form-grid"><label>Collected<input type="date" value={fields.collected} onChange={(e) => setField('collected', e.target.value)} /></label><label>Facility<input value={fields.facility} onChange={(e) => setField('facility', e.target.value)} /></label></div>
          {fields.items.map((item, index) => <div className="scan-lab-row" key={`${item.test}-${index}`}><label>Test<input value={item.test} onChange={(e) => setLabField(index, 'test', e.target.value)} /></label><label>Result<input value={item.current} onChange={(e) => setLabField(index, 'current', e.target.value)} /></label><label>Unit<input value={item.unit} onChange={(e) => setLabField(index, 'unit', e.target.value)} /></label><label>Status<select value={item.status} onChange={(e) => setLabField(index, 'status', e.target.value)}><option value="normal">Normal</option><option value="high">High</option><option value="low">Low</option></select></label></div>)}
        </div> : <div className="form-grid single">{Object.entries(fields).map(([key, value]) => <label key={key}>{key.replace(/([A-Z])/g, ' $1')}<input value={value} onChange={(e) => setField(key, e.target.value)} /></label>)}</div>}
        <div className="scan-confidence"><FaCircleCheck /><span><strong>Review required</strong><small>Highlighted values were transcribed with high confidence, but clinical documents should always be verified.</small></span></div>
      </> : null}
      <div className="scan-actions"><button className="secondary-button" type="button" onClick={onCancel}>{stage === 'review' ? 'Discard' : 'Cancel'}</button>{stage === 'review' ? <button className="primary-button" type="button" onClick={() => onApply(category, fields, file?.name)}><FaCheck /> Confirm & update</button> : null}</div>
    </div>
  );
}

function Modal({ modal, onClose, setIntake, fluidGoal, setFluidGoal, showToast, onApplyScan }) {
  const [amount, setAmount] = useState(240);
  const [goalInput, setGoalInput] = useState(fluidGoal);
  const [formValue, setFormValue] = useState('');
  useEffect(() => { setAmount(240); setGoalInput(fluidGoal); setFormValue(''); }, [modal, fluidGoal]);
  if (!modal) return null;
  const closeAndToast = (message) => { onClose(); showToast(message); };
  const title = modalTitle(modal.type, modal.data);
  const fluidSubmit = () => { setIntake((value) => Math.min(2500, value + Number(amount || 0))); closeAndToast(`${amount} ml added to today’s fluid log.`); };
  const goalSubmit = () => { const next = Math.max(500, Math.min(3000, Number(goalInput || fluidGoal))); setFluidGoal(next); closeAndToast(`Daily fluid goal updated to ${next} ml.`); };
  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={classNames('modal', modal.type === 'scan' && 'scan-modal')} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header><div><span className="modal-icon">{modalIcon(modal.type)}</span><h2 id="modal-title">{title}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><FaXmark /></button></header>
        <div className="modal-body">
          {modal.type === 'scan' ? <ScanImport category={modal.data?.category} onCancel={onClose} onApply={onApplyScan} /> : null}
          {modal.type === 'fluid' ? <><p className="modal-lede">Log fluids from drinks, ice, soups, and other liquid foods.</p><div className="amount-grid">{[120, 180, 240, 350, 500].map((value) => <button type="button" className={amount === value ? 'selected' : ''} onClick={() => setAmount(value)} key={value}>{value}<small>ml</small></button>)}</div><label className="field-label">Custom amount<input type="number" min="1" max="1500" value={amount} onChange={(e) => setAmount(e.target.value)} /><span>ml</span></label></> : null}
          {modal.type === 'fluidGoal' ? <><p className="modal-lede">Use the daily goal recommended by your care team.</p><label className="field-label">Daily goal<input type="number" min="500" max="3000" step="50" value={goalInput} onChange={(e) => setGoalInput(e.target.value)} /><span>ml</span></label><div className="info-box"><FaCircleInfo /> Your current care-plan target is 1,500 ml per day.</div></> : null}
          {modal.type === 'quickLog' ? <div className="modal-action-grid">{quickActions.slice(0, 4).map(({ label, icon: Icon, action }) => <button type="button" key={label} onClick={() => closeAndToast(`${label} opened.`)}><Icon /><span>{label}</span></button>)}</div> : null}
          {modal.type === 'more' ? <div className="more-menu">{[...kitSections.map((section) => ({ id: section.start, label: section.label, icon: section.items[0].icon })), ...navItems.filter((item) => ['support', 'settings'].includes(item.id))].map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => { window.dispatchEvent(new CustomEvent('mykit:navigate', { detail: id })); onClose(); }}><Icon /><span>{label}</span><FaChevronRight /></button>)}</div> : null}
          {modal.type === 'article' ? <ArticleModal article={modal.data} /> : null}
          {modal.type === 'lab' ? <LabModal row={modal.data} /> : null}
          {modal.type === 'appointmentDetails' ? <AppointmentModal appointment={modal.data} /> : null}
          {modal.type === 'medication' ? <MedicationModal medication={modal.data} /> : null}
          {!['scan', 'fluid', 'fluidGoal', 'quickLog', 'more', 'article', 'lab', 'appointmentDetails', 'medication'].includes(modal.type) ? <GenericModalContent type={modal.type} data={modal.data} value={formValue} setValue={setFormValue} /> : null}
        </div>
        {modal.type === 'scan' ? null : <footer>
          <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
          {modal.type === 'fluid' ? <button className="primary-button" type="button" onClick={fluidSubmit}>Add to Log</button> : null}
          {modal.type === 'fluidGoal' ? <button className="primary-button" type="button" onClick={goalSubmit}>Save Goal</button> : null}
          {['quickLog', 'more', 'article', 'lab', 'appointmentDetails', 'medication'].includes(modal.type) ? null : !['fluid', 'fluidGoal'].includes(modal.type) ? <button className="primary-button" type="button" onClick={() => closeAndToast(actionToast(modal.type))}>{primaryModalAction(modal.type)}</button> : null}
        </footer>}
      </section>
    </div>
  );
}

function modalTitle(type, data) {
  const titles = {
    scan: `Scan or upload ${scanTemplates[data?.category]?.label || 'document'}`, fluid: 'Add Fluid Intake', fluidGoal: 'Edit Fluid Goal', quickLog: 'What would you like to log?', more: 'More', article: data?.title || 'Education Article', lab: `${data?.test || 'Lab'} Result`, appointmentDetails: data?.title || 'Appointment Details', medication: data?.name || 'Medication Details',
    logVitals: 'Log Blood Pressure', logWeight: 'Log Weight', reminder: 'Medication Reminder', report: 'Health Report', appointment: 'Request Appointment', addMedication: 'Add Medication', logFood: 'Log Food', mealPlan: 'Edit Meal Plan', messageDietitian: 'Message Dietitian', messageCareTeam: 'Message Care Team', newMessage: 'New Message', supportTicket: 'Contact myKIT Support', editProfile: 'Edit Profile', password: 'Change Password', export: 'Export My Data', signOut: 'Sign Out', call: 'Call Kidney Center', checkIn: 'Treatment Pre-check', questions: 'Questions for Your Visit', attachment: 'Add Attachment', directions: 'Directions', treatmentSummary: 'Treatment Summary', careNotes: 'Care Notes', foodGuide: 'Food Guide', medicationList: 'Medication List', privacy: 'Privacy Permissions', devices: 'Connected Devices', units: 'Units', language: 'Language', accessibility: 'Accessibility', documents: 'Shared Documents', calendar: 'Treatment Calendar', accessConcern: 'Report an Access Concern', accessCard: 'Vascular Access ID Card', accessRecord: 'Add Access Record', messageCoordinator: 'Message Transplant Coordinator', listingGuide: 'How Transplant Listing Works',
  };
  return titles[type] || data?.name || 'myKIT';
}

function modalIcon(type) {
  const icons = { scan: <FaCamera />, fluid: <FaDroplet />, fluidGoal: <FaDroplet />, logVitals: <FaHeartPulse />, logWeight: <FaWeightScale />, article: <FaBookOpen />, lab: <FaFlaskVial />, appointment: <FaCalendarDays />, appointmentDetails: <FaCalendarDays />, medication: <FaCapsules />, reminder: <FaBell />, report: <FaChartColumn />, messageCareTeam: <FaMessage />, messageDietitian: <FaMessage />, newMessage: <FaMessage />, supportTicket: <FaHeadset />, editProfile: <FaPen />, password: <FaLock />, export: <FaDownload />, signOut: <FaXmark />, call: <FaPhone />, checkIn: <FaCheck />, directions: <FaLocationDot /> };
  return icons[type] || <FaCircleInfo />;
}

function ArticleModal({ article }) {
  return <div className="article-modal"><img src={article?.image} alt="" /><span className="article-category">{article?.category}</span><p>{article?.subtitle}</p><h3>What you’ll learn</h3><ul><li>Simple choices that support kidney health</li><li>What to limit and what to ask your care team</li><li>Practical steps you can use today</li></ul><div className="info-box"><FaBookOpen /> {article?.length || '5 min read'} · Reviewed by the myKIT clinical education team</div></div>;
}

function LabModal({ row }) {
  return <div className="lab-modal"><div className="lab-result-big"><span>Current result</span><strong>{row?.current}</strong><small>{row?.unit}</small><b className={classNames('status-chip', row?.status)}>{row?.status}</b></div><div className="result-comparison"><div><small>Previous</small><strong>{row?.previous}</strong></div><div><small>Reference range</small><strong>{row?.range}</strong></div><div><small>Collected</small><strong>{row?.date}</strong></div></div><div className="info-box"><FaCircleInfo /> Your care team interprets this result in the context of your full treatment plan.</div></div>;
}

function AppointmentModal({ appointment }) {
  return <div className="detail-list modal-details"><div><FaCalendarDays /><span><small>Date</small><strong>{appointment?.month} {appointment?.day}, 2026</strong></span></div><div><FaClock /><span><small>Time</small><strong>{appointment?.time}</strong></span></div><div><FaUserDoctor /><span><small>With</small><strong>{appointment?.clinician}</strong></span></div><div><FaLocationDot /><span><small>Visit type</small><strong>{appointment?.type}</strong></span></div></div>;
}

function MedicationModal({ medication }) {
  return <div className="detail-list modal-details"><div><FaCapsules /><span><small>Medication</small><strong>{medication?.name}</strong></span></div><div><FaNotesMedical /><span><small>Instructions</small><strong>{medication?.instructions}</strong></span></div><div><FaClock /><span><small>Scheduled</small><strong>{medication?.time}</strong></span></div><div><FaShieldHeart /><span><small>Status</small><strong>{medication?.status}</strong></span></div></div>;
}

function GenericModalContent({ type, data, value, setValue }) {
  if (type === 'call') return <div className="call-panel"><FaPhone /><strong>1-800-123-5434</strong><p>City Kidney Center · Monday–Friday, 8 AM–8 PM</p></div>;
  if (type === 'signOut') return <div className="confirmation-panel"><FaShieldHeart /><p>You’ll need to sign in again to access your kidney health information.</p></div>;
  if (type === 'report' || type === 'export' || type === 'medicationList') return <div className="download-panel"><FaFileLines /><p>A secure PDF will be prepared with your latest health information.</p><label><input type="checkbox" defaultChecked /> Include medication list</label><label><input type="checkbox" defaultChecked /> Include lab trends</label></div>;
  if (type === 'logVitals') return <div className="form-grid"><label>Systolic<input type="number" placeholder="125" /></label><label>Diastolic<input type="number" placeholder="76" /></label><label>Pulse<input type="number" placeholder="72" /></label><label>Time<input type="time" defaultValue="08:00" /></label></div>;
  if (type === 'logWeight') return <div className="form-grid single"><label>Weight<input type="number" placeholder="74.2" /><span>kg</span></label><label>Notes<textarea placeholder="Optional notes" /></label></div>;
  if (['messageCareTeam', 'messageDietitian', 'newMessage', 'supportTicket'].includes(type)) return <div className="form-grid single"><label>Subject<input placeholder="How can we help?" /></label><label>Message<textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="Write your message" /></label></div>;
  if (type === 'appointment') return <div className="form-grid single"><label>Visit type<select><option>Nephrology follow-up</option><option>Dietitian consultation</option><option>Lab visit</option></select></label><label>Preferred date<input type="date" min="2026-07-21" /></label><label>Notes<textarea placeholder="Tell us what you need help with" /></label></div>;
  if (type === 'accessConcern') return <div className="form-grid single"><label>What changed?<select><option>Thrill feels different or absent</option><option>Redness, warmth, or drainage</option><option>New swelling or pain</option><option>Bleeding lasted longer than usual</option></select></label><label>When did you notice it?<input type="datetime-local" /></label><label>Details<textarea placeholder="Describe what you feel or see" /></label><div className="access-alert"><FaCircleExclamation /><span><strong>Urgent warning</strong><small>Call emergency services for severe bleeding. Contact your dialysis center immediately if the thrill is absent.</small></span></div></div>;
  if (type === 'accessRecord') return <div className="form-grid single"><label>Record type<select><option>Access exam</option><option>Flow measurement</option><option>Intervention</option><option>Photo or document</option></select></label><label>Date<input type="date" /></label><label>Notes<textarea placeholder="Add access-care details" /></label></div>;
  if (type === 'messageCoordinator') return <div className="form-grid single"><label>Subject<select><option>Question about a prerequisite</option><option>Scheduling</option><option>Insurance or authorization</option><option>Change in my health</option></select></label><label>Message<textarea placeholder="Write to Ana Ruiz, RN" /></label></div>;
  if (type === 'listingGuide') return <div className="generic-panel"><FaHospital /><p>Your evaluation team reviews medical, psychosocial, financial, and support requirements. After prerequisites are complete, the selection committee makes a listing decision and explains any next steps.</p></div>;
  if (type === 'accessCard') return <div className="download-panel"><FaSyringe /><p>Left forearm AV fistula · Created Mar 12, 2025. Show this card before blood pressure checks, blood draws, IV placement, imaging, or procedures.</p></div>;
  return <div className="generic-panel"><FaCircleInfo /><p>{data?.name ? `${data.name} details are ready for review.` : 'This interactive prototype demonstrates the selected myKIT workflow.'}</p></div>;
}

function primaryModalAction(type) {
  const map = { report: 'Prepare Download', export: 'Prepare Export', medicationList: 'Download List', appointment: 'Send Request', logVitals: 'Save Reading', logWeight: 'Save Weight', messageCareTeam: 'Send Message', messageDietitian: 'Send Message', newMessage: 'Start Conversation', supportTicket: 'Submit Request', editProfile: 'Save Changes', password: 'Update Password', signOut: 'Sign Out', call: 'Call Now', checkIn: 'Complete Pre-check', accessConcern: 'Send to Dialysis Team', accessCard: 'Download Card', accessRecord: 'Save Record', messageCoordinator: 'Send Message' };
  return map[type] || 'Save';
}

function actionToast(type) {
  const map = { report: 'Your secure report is ready.', export: 'Your data export is being prepared.', medicationList: 'Medication list downloaded.', appointment: 'Appointment request sent.', logVitals: 'Blood pressure reading saved.', logWeight: 'Weight saved.', messageCareTeam: 'Message sent to your care team.', messageDietitian: 'Message sent to Melissa.', newMessage: 'Conversation started.', supportTicket: 'Support request submitted.', editProfile: 'Profile updated.', password: 'Password updated.', signOut: 'You have been signed out of the prototype.', call: 'Calling City Kidney Center…', checkIn: 'Pre-check completed.', accessConcern: 'Access concern sent to your dialysis team.', accessCard: 'Access ID card downloaded.', accessRecord: 'Access record saved.', messageCoordinator: 'Message sent to Ana Ruiz, RN.' };
  return map[type] || 'Changes saved.';
}

function Toast({ message }) {
  if (!message) return null;
  return <div className="toast" role="status"><FaCircleCheck /><span>{message}</span></div>;
}

function App() {
  const [activePage, setActivePage] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [fluidIntake, setFluidIntake] = useState(1200);
  const [fluidGoal, setFluidGoal] = useState(1500);
  const [medications, setMedications] = useState(initialMedications);
  const [labs, setLabs] = useState(labRows);
  const [scannedFoods, setScannedFoods] = useState([]);
  const [messages, setMessages] = useState([]);

  const showToast = (message) => { setToast(message); window.clearTimeout(window.__mykitToast); window.__mykitToast = window.setTimeout(() => setToast(''), 3200); };
  const navigate = (page) => { setActivePage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const openModal = (type, data) => setModal({ type, data });
  const toggleMedication = (id) => {
    setMedications((list) => list.map((med) => med.id === id ? { ...med, status: med.status === 'taken' ? 'due' : 'taken' } : med));
    showToast('Medication status updated.');
  };
  const applyScan = (category, fields, sourceName) => {
    if (category === 'medication') {
      const family = fields.name.split(' ')[0].toLowerCase();
      setMedications((list) => {
        const match = list.findIndex((med) => med.name.toLowerCase().startsWith(family));
        const next = { id: match >= 0 ? list[match].id : Date.now(), name: fields.name, instructions: fields.instructions, time: fields.time, status: 'due', icon: FaCapsules, sourceName };
        return match >= 0 ? list.map((med, index) => index === match ? next : med) : [...list, next];
      });
      showToast('Medication transcription reviewed and updated.');
    }
    if (category === 'lab') {
      const date = new Date(`${fields.collected}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      setLabs((list) => fields.items.reduce((current, item) => {
        const previous = current.find((row) => row.test.toLowerCase() === item.test.toLowerCase());
        const row = { ...item, previous: previous?.current || '—', date, sourceName };
        return previous ? current.map((existing) => existing.test.toLowerCase() === item.test.toLowerCase() ? row : existing) : [...current, row];
      }, list));
      showToast(`${fields.items.length} lab results reviewed and updated.`);
    }
    if (category === 'food') {
      setScannedFoods((list) => [{ id: Date.now(), ...fields, sourceName }, ...list]);
      showToast('Food transcription added to today’s nutrition log.');
    }
    if (category === 'document') showToast(`${fields.title} uploaded to ${fields.category}.`);
    setModal(null);
  };
  useEffect(() => {
    const handler = (event) => navigate(event.detail);
    window.addEventListener('mykit:navigate', handler);
    return () => window.removeEventListener('mykit:navigate', handler);
  }, []);

  const page = useMemo(() => {
    const common = { onNavigate: navigate, openModal };
    switch (activePage) {
      case 'home': return <Dashboard {...common} medications={medications} onToggleMedication={toggleMedication} fluidIntake={fluidIntake} fluidGoal={fluidGoal} />;
      case 'insights': return <InsightsHub {...common} />;
      case 'tools': return <ToolsHub {...common} />;
      case 'health': return <HealthPage {...common} />;
      case 'treatments': return <TreatmentsPage openModal={openModal} />;
      case 'vascular': return <VascularAccessPage openModal={openModal} />;
      case 'transplant': return <TransplantPage {...common} />;
      case 'medications': return <MedicationsPage medications={medications} onToggle={toggleMedication} openModal={openModal} />;
      case 'diet': return <DietPage openModal={openModal} scannedFoods={scannedFoods} />;
      case 'fluid': return <FluidPage intake={fluidIntake} goal={fluidGoal} setIntake={setFluidIntake} openModal={openModal} />;
      case 'appointments': return <AppointmentsPage openModal={openModal} />;
      case 'labs': return <LabsPage openModal={openModal} labs={labs} />;
      case 'education': return <EducationPage openModal={openModal} />;
      case 'messages': return <MessagesPage messages={messages} setMessages={setMessages} openModal={openModal} />;
      case 'support': return <SupportPage onNavigate={navigate} openModal={openModal} />;
      case 'settings': return <SettingsPage openModal={openModal} />;
      default: return <Dashboard {...common} medications={medications} onToggleMedication={toggleMedication} fluidIntake={fluidIntake} fluidGoal={fluidGoal} />;
    }
  }, [activePage, medications, labs, scannedFoods, fluidIntake, fluidGoal, messages]);

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={navigate} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="main-area">
        <Header activePage={activePage} onMenu={() => setMobileOpen(true)} onOpenNotifications={() => openModal('notifications')} onNavigate={navigate} />
        <div className="page-content" data-page={activePage}>{page}</div>
        <div className="prototype-disclaimer"><FaCircleInfo /> Demo data only — not for clinical decision-making.</div>
      </main>
      <BottomNav activePage={activePage} onNavigate={navigate} openModal={openModal} />
      <Modal modal={modal} onClose={() => setModal(null)} setIntake={setFluidIntake} fluidGoal={fluidGoal} setFluidGoal={setFluidGoal} showToast={showToast} onApplyScan={applyScan} />
      <Toast message={toast} />
    </div>
  );
}

const rootElement = document.getElementById('root');
const appRoot = window.__mykitRoot || createRoot(rootElement);
window.__mykitRoot = appRoot;
appRoot.render(<React.StrictMode><App /></React.StrictMode>);
