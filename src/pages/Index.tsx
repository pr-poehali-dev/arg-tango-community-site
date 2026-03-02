import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/b4d968e7-9bac-4e8e-bf9b-cdb75a17a2ed/files/4eed0c7f-13e0-43bf-8a1f-601913e05ec4.jpg";
const STREET_IMG = "https://cdn.poehali.dev/projects/b4d968e7-9bac-4e8e-bf9b-cdb75a17a2ed/files/82945e8d-8e37-46ff-afa1-aa1817e5deff.jpg";
const ORCHESTRA_IMG = "https://cdn.poehali.dev/projects/b4d968e7-9bac-4e8e-bf9b-cdb75a17a2ed/files/a6c3c68b-3f17-4c3b-9ca8-a11378bf4a5a.jpg";

type Section = "home" | "history" | "events" | "schedule" | "chat" | "contacts";

interface ChatMessage {
  id: number;
  author: string;
  text: string;
  time: string;
  isOwn?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, author: "Елена", text: "Всем добрый вечер! Кто идёт на милонгу в пятницу?", time: "19:14" },
  { id: 2, author: "Михаил", text: "Я буду! Говорят, пригласят живой оркестр.", time: "19:17" },
  { id: 3, author: "Анна", text: "Обязательно приду. Уже две недели не была на танцах, скучаю по атмосфере 🌹", time: "19:23" },
  { id: 4, author: "Сергей", text: "Новичкам тоже можно? Я только три месяца занимаюсь.", time: "19:31" },
  { id: 5, author: "Елена", text: "Конечно! Милонга открыта для всех. Главное — желание танцевать.", time: "19:33" },
];

const SCHEDULE = [
  { day: "Понедельник", time: "19:00 – 21:00", type: "Занятие для начинающих", level: "Начальный" },
  { day: "Среда", time: "19:30 – 21:30", type: "Практика — техника и импровизация", level: "Средний" },
  { day: "Пятница", time: "20:00 – 23:30", type: "Вечерняя милонга", level: "Все уровни" },
  { day: "Суббота", time: "16:00 – 18:00", type: "Мастер-класс (по расписанию)", level: "Продвинутый" },
  { day: "Воскресенье", time: "15:00 – 17:00", type: "Открытая практика", level: "Все уровни" },
];

const EVENTS = [
  {
    date: "14 марта",
    year: "2026",
    title: "Весенняя Милонга",
    desc: "Торжественный вечер с живой музыкой. Приглашённые танцоры из Буэнос-Айреса. Дресс-код обязателен.",
    tag: "Милонга",
  },
  {
    date: "21 марта",
    year: "2026",
    title: "Мастер-класс: Вальс и Милонга",
    desc: "Двухчасовой интенсив с педагогом Родриго Гарсия. Ограниченное число мест.",
    tag: "Мастер-класс",
  },
  {
    date: "5 апреля",
    year: "2026",
    title: "Ночь в стиле 30-х",
    desc: "Тематическая вечеринка с музыкой Оркестра «Типика». Костюмы приветствуются.",
    tag: "Тематический вечер",
  },
  {
    date: "19 апреля",
    year: "2026",
    title: "Открытый урок для новичков",
    desc: "Бесплатное первое занятие для всех желающих познакомиться с аргентинским танго.",
    tag: "Открытый урок",
  },
];

const HISTORY_BLOCKS = [
  {
    period: "1880-е",
    title: "Рождение в предместьях",
    text: "Танго возникло в портовых кварталах Буэнос-Айреса — в районах Ла Бока и Сан Тельмо, где смешивались культуры иммигрантов из Европы, Африки и коренных жителей. Это был язык тоски, страсти и надежды.",
  },
  {
    period: "1910-е",
    title: "Завоевание Парижа",
    text: "Из кварталов бедноты танго триумфально вышло на мировую арену. Парижский бомонд влюбился в него безвозвратно, и эта мода разлилась по всей Европе. Буэнос-Айрес признал танго своим официальным достоянием.",
  },
  {
    period: "1940-е",
    title: "Золотой век",
    text: "Эпоха великих оркестров — Д'Ариенсо, Пульезе, Ди Сарли. Залы милонг полны каждую ночь. Великий Астор Пьяццолла начинает свой путь, позже навсегда изменив звучание танго.",
  },
  {
    period: "Сегодня",
    title: "Живое наследие",
    text: "В 2009 году ЮНЕСКО внесло аргентинское танго в список нематериального культурного наследия человечества. Тысячи сообществ по всему миру хранят и передают это великое искусство.",
  },
];

function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`font-cormorant text-sm tracking-widest uppercase transition-colors duration-300 tango-link ${
        active ? "text-primary" : "text-foreground/70 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-12">
      {sub && (
        <p className="font-cormorant text-primary/80 tracking-[0.3em] uppercase text-xs mb-3">{sub}</p>
      )}
      <h2 className="font-playfair text-4xl md:text-5xl text-foreground mb-4">{children}</h2>
      <div className="divider-ornament text-sm mx-auto max-w-xs">
        <span className="font-cormorant text-primary/60 text-lg">✦</span>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [userName, setUserName] = useState("Гость");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      author: userName,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  };

  const nav: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "history", label: "История" },
    { id: "events", label: "Мероприятия" },
    { id: "schedule", label: "Расписание" },
    { id: "chat", label: "Чат" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background font-cormorant">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setActiveSection("home")}
            className="font-playfair text-xl text-primary tracking-wider hover:opacity-80 transition-opacity"
          >
            <span className="italic">Танго</span> энтузиасты
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <NavLink
                key={item.id}
                label={item.label}
                active={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
              />
            ))}
          </nav>

          <button
            className="md:hidden text-foreground/70 hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border/40 px-6 py-4 flex flex-col gap-4">
            {nav.map((item) => (
              <NavLink
                key={item.id}
                label={item.label}
                active={activeSection === item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
              />
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">

        {/* ══ HOME ══ */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0">
                <img src={HERO_IMG} alt="Аргентинское танго" className="w-full h-full object-cover sepia-img" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
              </div>
              <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                <p className="font-cormorant text-primary tracking-[0.4em] uppercase text-xs mb-6">
                  Сообщество аргентинского танго
                </p>
                <h1 className="font-playfair text-6xl md:text-8xl text-foreground mb-6 leading-none">
                  <span className="italic text-primary">Танго</span> энтузиасты
                </h1>
                <p className="font-cormorant text-xl md:text-2xl text-foreground/75 mb-10 max-w-xl mx-auto leading-relaxed">
                  Место, где страсть встречает традицию. Добро пожаловать в мир аргентинского танго.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setActiveSection("events")}
                    className="px-8 py-3 bg-primary text-primary-foreground font-cormorant tracking-widest uppercase text-sm hover:bg-primary/90 transition-colors"
                  >
                    Ближайшие события
                  </button>
                  <button
                    onClick={() => setActiveSection("schedule")}
                    className="px-8 py-3 border border-primary/50 text-primary font-cormorant tracking-widest uppercase text-sm hover:bg-primary/10 transition-colors"
                  >
                    Расписание занятий
                  </button>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50">
                <Icon name="ChevronDown" size={20} className="text-primary animate-bounce" />
              </div>
            </section>

            <section className="py-20 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="divider-ornament mb-10">
                  <span className="font-cormorant text-primary text-2xl">✦</span>
                </div>
                <p className="font-playfair text-2xl md:text-3xl text-foreground/80 leading-relaxed italic">
                  «Танго — это разговор между двумя людьми,<br className="hidden md:block" />
                  которые говорят не словами, а движением»
                </p>
                <p className="mt-4 text-muted-foreground text-sm tracking-widest">— Хорхе Луис Борхес</p>
                <div className="divider-ornament mt-10">
                  <span className="font-cormorant text-primary text-2xl">✦</span>
                </div>
              </div>
            </section>

            <section className="py-16 px-6 bg-card/30">
              <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-0">
                {[
                  { icon: "Music", title: "Занятия", text: "Занятия для всех уровней — от начинающих до опытных. Деликатный подход и индивидуальное внимание.", btn: "schedule", btnLabel: "Расписание" },
                  { icon: "Star", title: "Милонги", text: "Регулярные вечерние встречи, живая музыка и атмосфера настоящего Буэнос-Айреса.", btn: "events", btnLabel: "Мероприятия" },
                  { icon: "Users", title: "Сообщество", text: "Тёплое сообщество единомышленников. Общайтесь, делитесь впечатлениями, находите партнёров.", btn: "chat", btnLabel: "Чат" },
                ].map((card, i) => (
                  <div key={i} className="p-10 border border-border/40 text-center group hover:bg-card/60 transition-colors">
                    <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center border border-primary/30 text-primary group-hover:border-primary/60 transition-colors">
                      <Icon name={card.icon} fallback="Circle" size={20} />
                    </div>
                    <h3 className="font-playfair text-2xl mb-4">{card.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">{card.text}</p>
                    <button onClick={() => setActiveSection(card.btn as Section)} className="text-primary text-sm tracking-widest uppercase tango-link font-cormorant">
                      {card.btnLabel} →
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative h-64 md:h-80 overflow-hidden">
              <img src={ORCHESTRA_IMG} alt="Оркестр" className="w-full h-full object-cover sepia-img" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-background" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-playfair italic text-3xl md:text-4xl text-foreground/90 text-center px-6">
                  Почувствуй ритм Буэнос-Айреса
                </p>
              </div>
            </section>
          </div>
        )}

        {/* ══ HISTORY ══ */}
        {activeSection === "history" && (
          <div className="animate-fade-in py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <SectionTitle sub="Откуда мы пришли">История танго</SectionTitle>
              <div className="mb-16 relative h-72 md:h-96 overflow-hidden vintage-frame">
                <img src={STREET_IMG} alt="Буэнос-Айрес" className="w-full h-full object-cover sepia-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="font-cormorant italic text-muted-foreground text-sm tracking-widest">Буэнос-Айрес, начало XX века</p>
                </div>
              </div>
              <div className="space-y-0">
                {HISTORY_BLOCKS.map((block, i) => (
                  <div key={i} className="flex gap-8 border-b border-border/30 pb-10 mb-10">
                    <div className="hidden md:flex flex-col items-center">
                      <div className="w-px flex-1 bg-gradient-to-b from-transparent to-primary/40" />
                      <div className="w-2 h-2 rounded-full bg-primary/60 my-2 shrink-0" />
                      <div className="w-px flex-1 bg-gradient-to-b from-primary/40 to-transparent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-primary tracking-[0.3em] uppercase text-xs font-cormorant mb-2">{block.period}</p>
                      <h3 className="font-playfair text-2xl md:text-3xl mb-4">{block.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">{block.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-8 border border-primary/20 bg-card/40 text-center">
                <p className="font-playfair italic text-xl text-foreground/80">
                  В 2009 году ЮНЕСКО включило аргентинское танго в Список нематериального культурного наследия человечества.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══ EVENTS ══ */}
        {activeSection === "events" && (
          <div className="animate-fade-in py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <SectionTitle sub="Приглашаем">Ближайшие мероприятия</SectionTitle>
              <div className="grid md:grid-cols-2 gap-px bg-border/40">
                {EVENTS.map((ev, i) => (
                  <div key={i} className="bg-background p-8 hover:bg-card/60 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-primary text-3xl font-playfair">{ev.date}</p>
                        <p className="text-muted-foreground text-xs tracking-widest">{ev.year}</p>
                      </div>
                      <span className="text-xs tracking-widest uppercase font-cormorant border border-primary/30 text-primary px-2 py-1">
                        {ev.tag}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl mb-3 group-hover:text-primary transition-colors">{ev.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">{ev.desc}</p>
                    <button className="mt-6 text-primary text-sm tracking-widest uppercase tango-link font-cormorant">
                      Узнать подробнее →
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <p className="text-muted-foreground text-sm italic">
                  Следите за обновлениями в нашем чате сообщества
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══ SCHEDULE ══ */}
        {activeSection === "schedule" && (
          <div className="animate-fade-in py-20 px-6">
            <div className="max-w-3xl mx-auto">
              <SectionTitle sub="Когда мы танцуем">Расписание</SectionTitle>
              <div className="space-y-0">
                {SCHEDULE.map((item, i) => (
                  <div key={i} className="border-b border-border/40 py-7 flex flex-col md:flex-row md:items-center gap-3 md:gap-8 hover:bg-card/30 px-4 -mx-4 transition-colors group">
                    <div className="md:w-36 shrink-0">
                      <p className="font-playfair text-primary text-lg">{item.day}</p>
                    </div>
                    <div className="md:w-44 shrink-0">
                      <p className="font-cormorant text-foreground/80 text-base tracking-wide">{item.time}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-cormorant text-lg text-foreground group-hover:text-primary transition-colors">{item.type}</p>
                    </div>
                    <div>
                      <span className={`text-xs tracking-widest uppercase font-cormorant px-2 py-1 border ${
                        item.level === "Начальный"
                          ? "border-emerald-700/40 text-emerald-600/80"
                          : item.level === "Все уровни"
                          ? "border-primary/30 text-primary/80"
                          : "border-orange-700/40 text-orange-500/80"
                      }`}>
                        {item.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-border/40 bg-card/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <p className="font-playfair text-lg">Адрес</p>
                  </div>
                  <p className="text-muted-foreground">ул. Танцевальная, 12, зал «Буэнос-Айрес»</p>
                </div>
                <div className="p-6 border border-border/40 bg-card/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="Info" size={16} className="text-primary" />
                    <p className="font-playfair text-lg">Первое занятие</p>
                  </div>
                  <p className="text-muted-foreground">Приходи на пробный урок — первый раз бесплатно</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button onClick={() => setActiveSection("contacts")} className="px-8 py-3 bg-primary text-primary-foreground font-cormorant tracking-widest uppercase text-sm hover:bg-primary/90 transition-colors">
                  Записаться
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ CHAT ══ */}
        {activeSection === "chat" && (
          <div className="animate-fade-in py-20 px-6">
            <div className="max-w-2xl mx-auto">
              <SectionTitle sub="Общение">Общий чат</SectionTitle>
              <div className="mb-4 flex items-center gap-3">
                <label className="text-muted-foreground text-sm font-cormorant">Ваше имя:</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value || "Гость")}
                  className="bg-card border border-border/60 px-3 py-1 text-foreground text-sm font-cormorant focus:outline-none focus:border-primary/60 w-40"
                  placeholder="Ваше имя"
                />
              </div>
              <div className="border border-border/40 bg-card/30 vintage-frame">
                <div className="h-96 overflow-y-auto p-6 space-y-5">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-playfair shrink-0 ${
                        msg.isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {msg.author[0]}
                      </div>
                      <div className={`max-w-xs ${msg.isOwn ? "items-end" : "items-start"} flex flex-col`}>
                        <div className={`flex items-baseline gap-2 mb-1 ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                          <span className="text-xs font-playfair text-primary">{msg.author}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <div className={`px-4 py-2 text-sm font-cormorant leading-relaxed ${
                          msg.isOwn
                            ? "bg-primary/20 border border-primary/30 text-foreground"
                            : "bg-muted text-foreground"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="border-t border-border/40 p-4 flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Напишите сообщение..."
                    className="flex-1 bg-background border border-border/60 px-4 py-2 text-foreground text-sm font-cormorant focus:outline-none focus:border-primary/60 placeholder:text-muted-foreground"
                  />
                  <button onClick={sendMessage} className="px-5 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    <Icon name="Send" size={16} />
                  </button>
                </div>
              </div>
              <p className="mt-4 text-center text-muted-foreground text-xs italic">
                Чат сообщества — делитесь впечатлениями, задавайте вопросы, находите партнёров
              </p>
            </div>
          </div>
        )}

        {/* ══ CONTACTS ══ */}
        {activeSection === "contacts" && (
          <div className="animate-fade-in py-20 px-6">
            <div className="max-w-3xl mx-auto">
              <SectionTitle sub="Свяжитесь с нами">Контакты</SectionTitle>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  {[
                    { icon: "MapPin", label: "Адрес", value: "ул. Танцевальная, 12\nзал «Буэнос-Айрес»" },
                    { icon: "Phone", label: "Телефон", value: "+7 (000) 000-00-00" },
                    { icon: "Mail", label: "Email", value: "info@eltango.ru" },
                    { icon: "Clock", label: "Часы работы", value: "Пн–Вс: 15:00 – 23:00" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-9 h-9 border border-primary/30 flex items-center justify-center shrink-0 text-primary">
                        <Icon name={item.icon} fallback="Circle" size={15} />
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase font-cormorant text-muted-foreground mb-1">{item.label}</p>
                        <p className="font-cormorant text-foreground text-base whitespace-pre-line">{item.value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <p className="text-xs tracking-widest uppercase font-cormorant text-muted-foreground mb-3">Социальные сети</p>
                    <div className="flex gap-3">
                      {["Instagram", "Youtube", "Send"].map((icon, i) => (
                        <button key={i} className="w-9 h-9 border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
                          <Icon name={icon} fallback="Circle" size={15} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border border-border/40 bg-card/30 p-6 vintage-frame">
                  <h3 className="font-playfair text-xl mb-5">Написать нам</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs tracking-widest uppercase font-cormorant text-muted-foreground block mb-1">Ваше имя</label>
                      <input type="text" className="w-full bg-background border border-border/60 px-3 py-2 text-foreground text-sm font-cormorant focus:outline-none focus:border-primary/60" placeholder="Имя и фамилия" />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase font-cormorant text-muted-foreground block mb-1">Телефон или Email</label>
                      <input type="text" className="w-full bg-background border border-border/60 px-3 py-2 text-foreground text-sm font-cormorant focus:outline-none focus:border-primary/60" placeholder="+7 или email" />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase font-cormorant text-muted-foreground block mb-1">Сообщение</label>
                      <textarea rows={4} className="w-full bg-background border border-border/60 px-3 py-2 text-foreground text-sm font-cormorant focus:outline-none focus:border-primary/60 resize-none" placeholder="Ваш вопрос или пожелание..." />
                    </div>
                    <button className="w-full py-3 bg-primary text-primary-foreground font-cormorant tracking-widest uppercase text-sm hover:bg-primary/90 transition-colors">
                      Отправить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-border/30 py-10 px-6 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-playfair italic text-primary text-2xl mb-2">El Tango</p>
          <p className="text-muted-foreground text-xs tracking-widest uppercase font-cormorant">
            Сообщество аргентинского танго
          </p>
          <div className="divider-ornament my-6 max-w-xs mx-auto">
            <span className="text-primary/40">✦</span>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 El Tango. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}