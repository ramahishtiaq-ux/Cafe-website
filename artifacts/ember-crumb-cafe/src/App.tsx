import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Plus,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationSent, setReservationSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [menuFilter, setMenuFilter] = useState<'all' | 'bakes' | 'coffee'>('all');
  const [quantity, setQuantity] = useState(2);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [menuFilter]);

  const closeMobile = () => setMobileOpen(false);
  const openReservation = () => {
    setReservationSent(false);
    setReservationOpen(true);
  };

  const menuItems = [
    { type: 'bakes', name: 'Brown butter morning bun', detail: 'orange, cardamom, raw sugar', price: '$6', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80' },
    { type: 'bakes', name: 'Twelve-hour sourdough', detail: 'cultured butter, sea salt', price: '$8', image: 'https://images.unsplash.com/photo-1589367920969-ab8e050eb0e9?w=800&q=80' },
    { type: 'coffee', name: 'Ember house filter', detail: 'honey process · Rwanda', price: '$5', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80' },
    { type: 'bakes', name: 'Seasonal fruit galette', detail: 'oat streusel, crème fraîche', price: '$7', image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80' },
    { type: 'coffee', name: 'Oat milk cortado', detail: 'espresso, warm oat, cinnamon', price: '$6', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80' },
    { type: 'bakes', name: 'Black sesame cookie', detail: 'miso caramel, rye crumb', price: '$4', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' },
  ];
  const filteredItems = menuItems.filter((item) => menuFilter === 'all' || item.type === menuFilter);

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#f1eadb] text-[#342a21]">
      <div className="bg-[#556148] px-5 py-2.5 text-center text-[10px] uppercase tracking-[.18em] text-[#f4eddf] sm:text-xs">
        <span className="mono">Today’s batch: orange-cardamom buns until they’re gone</span>
      </div>

      <header className="relative z-20 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-10 lg:px-16">
        <a href="#top" className="group flex items-center gap-3" data-testid="link-home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#342a21] text-lg leading-none transition-transform group-hover:rotate-12">e</span>
          <span className="display text-xl tracking-tight sm:text-2xl">Ember &amp; Crumb</span>
        </a>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          <a href="#story" className="mono text-[11px] uppercase tracking-[.13em] text-[#6f6255] transition-colors hover:text-[#a74b35]" data-testid="link-story">Our story</a>
          <a href="#menu" className="mono text-[11px] uppercase tracking-[.13em] text-[#6f6255] transition-colors hover:text-[#a74b35]" data-testid="link-menu">Menu</a>
          <a href="#visit" className="mono text-[11px] uppercase tracking-[.13em] text-[#6f6255] transition-colors hover:text-[#a74b35]" data-testid="link-visit">Visit</a>
          <button onClick={openReservation} className="rounded-full bg-[#a74b35] px-5 py-3 text-xs font-semibold uppercase tracking-[.12em] text-[#f8f1e5] transition hover:bg-[#813a2a]" data-testid="button-header-reserve">
            Reserve a table
          </button>
        </nav>
        <button onClick={() => setMobileOpen((open) => !open)} className="rounded-full border border-[#342a21] p-2.5 md:hidden" aria-label="Toggle navigation" data-testid="button-mobile-menu">
          {mobileOpen ? <X size={19} /> : <MenuIcon size={19} />}
        </button>
        {mobileOpen && (
          <div className="absolute left-5 right-5 top-[76px] rounded-2xl border border-[#d8cbbb] bg-[#f8f1e5] p-5 shadow-[0_18px_40px_rgba(59,42,28,.14)] md:hidden">
            <div className="flex flex-col gap-4">
              <a onClick={closeMobile} href="#story" className="mono border-b border-[#ded2c3] pb-3 text-xs uppercase tracking-[.13em]" data-testid="link-mobile-story">Our story</a>
              <a onClick={closeMobile} href="#menu" className="mono border-b border-[#ded2c3] pb-3 text-xs uppercase tracking-[.13em]" data-testid="link-mobile-menu">Menu</a>
              <a onClick={closeMobile} href="#visit" className="mono border-b border-[#ded2c3] pb-3 text-xs uppercase tracking-[.13em]" data-testid="link-mobile-visit">Visit</a>
              <button onClick={() => { closeMobile(); openReservation(); }} className="w-full rounded-full bg-[#a74b35] px-5 py-3 text-xs font-semibold uppercase tracking-[.12em] text-[#f8f1e5]" data-testid="button-mobile-reserve">Reserve a table</button>
            </div>
          </div>
        )}
      </header>

      <section id="top" className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-20 pt-7 sm:px-10 md:grid-cols-[1.03fr_.97fr] md:items-center md:gap-8 md:pb-28 md:pt-12 lg:px-16 lg:pt-16">
        <div className="max-w-[650px]">
          <div className="animate-rise eyebrow mb-7 text-[#a74b35]">A neighborhood bakery + coffee bar / Oakland, CA</div>
          <h1 className="animate-rise delay-1 display text-[clamp(3.8rem,10vw,8.6rem)] leading-[.86] tracking-[-.065em] text-[#342a21]">
            Make room<br /><em className="text-[#a74b35]">for morning.</em>
          </h1>
          <p className="animate-rise delay-2 mt-8 max-w-[440px] text-lg leading-[1.55] text-[#6f6255] sm:text-xl">
            House-made pastry, carefully sourced coffee, and a little more time than you thought you had.
          </p>
          <div className="animate-rise delay-3 mt-9 flex flex-wrap items-center gap-4">
            <a href="#menu" className="group inline-flex items-center gap-3 rounded-full bg-[#342a21] px-6 py-3.5 text-sm font-semibold text-[#f8f1e5] transition hover:bg-[#a74b35]" data-testid="link-hero-menu">
              See what’s baking <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <button onClick={openReservation} className="inline-flex items-center gap-2 border-b border-[#a74b35] pb-1 text-sm font-semibold text-[#a74b35] transition hover:border-[#342a21] hover:text-[#342a21]" data-testid="button-hero-reserve">
              Reserve a table
            </button>
          </div>
          <div className="animate-rise delay-4 mt-16 flex items-end gap-8 border-t border-[#d8cbbb] pt-5">
            <div>
              <p className="eyebrow text-[#a74b35]">Open daily</p>
              <p className="mt-2 text-sm text-[#6f6255]">7am — 3pm</p>
            </div>
            <div className="h-10 w-px bg-[#d8cbbb]" />
            <div>
              <p className="eyebrow text-[#a74b35]">Find us</p>
              <p className="mt-2 text-sm text-[#6f6255]">2148 Telegraph Ave</p>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[590px] animate-rise delay-2">
          <div className="absolute -left-5 -top-5 z-10 flex h-24 w-24 animate-float items-center justify-center rounded-full bg-[#d99b48] text-center text-[10px] uppercase leading-[1.25] tracking-[.12em] text-[#342a21] sm:-left-8 sm:-top-7">
            <span>Slow baked<br />since 2018</span>
          </div>
          <div className="relative aspect-[.87] overflow-hidden rounded-[48%_48%_5%_5%/35%_35%_5%_5%] bg-[#d8cbbb]">
            <img src={`${import.meta.env.BASE_URL}hero-cafe.jpg`} alt="Coffee and a fresh croissant in warm morning light" className="h-full w-full object-cover" data-testid="img-hero-cafe" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#342a21]/45 to-transparent p-7 pt-24 text-[#f8f1e5]">
              <p className="mono text-[10px] uppercase tracking-[.15em]">Corner table, 8:14am</p>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-3 rounded-full border border-[#a74b35] bg-[#f1eadb] px-5 py-3 text-xs text-[#a74b35] sm:-right-10">
            <span className="mono">Take your time →</span>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8cbbb] bg-[#e9dfcf]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 py-7 sm:px-10 md:flex-row md:items-center lg:px-16">
          <p className="display max-w-[580px] text-2xl leading-[1.1] tracking-tight text-[#556148] sm:text-3xl">Good things take the time they need. We’re okay with that.</p>
          <div className="flex items-center gap-7 text-[#6f6255]">
            <div className="flex items-center gap-2"><Clock3 size={17} strokeWidth={1.5} /><span className="mono text-[10px] uppercase tracking-[.1em]">Baked from 4:30am</span></div>
            <div className="hidden h-8 w-px bg-[#cdbfae] sm:block" />
            <div className="hidden items-center gap-2 sm:flex"><MapPin size={17} strokeWidth={1.5} /><span className="mono text-[10px] uppercase tracking-[.1em]">Temescal, Oakland</span></div>
          </div>
        </div>
      </section>

      <section id="story" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-10 md:grid-cols-[.9fr_1.1fr] md:items-center md:gap-20 md:py-36 lg:px-16">
        <div className="reveal relative order-2 md:order-1">
          <div className="aspect-[.85] max-w-[490px] overflow-hidden rounded-[2px] bg-[#cfc2b1]">
            <img src={`${import.meta.env.BASE_URL}baker-hands.jpg`} alt="Baker hands shaping a sourdough loaf" className="h-full w-full object-cover" data-testid="img-baker-hands" />
          </div>
          <div className="absolute -bottom-7 -right-3 max-w-[245px] bg-[#556148] p-5 text-[#f5eddf] sm:-right-6">
            <p className="eyebrow mb-3 text-[#e5b967]">The daily ritual</p>
            <p className="display text-xl leading-tight">Flour on the counter. Music on low. No shortcuts.</p>
          </div>
        </div>
        <div className="reveal reveal-delay-1 order-1 md:order-2">
          <p className="eyebrow mb-6 text-[#a74b35]">A little about us</p>
          <h2 className="display max-w-[620px] text-[clamp(2.7rem,6vw,5.5rem)] leading-[.92] tracking-[-.055em]">The best part is the part you can’t hurry.</h2>
          <div className="mt-9 grid max-w-[650px] gap-5 text-[17px] leading-[1.65] text-[#6f6255] sm:grid-cols-2">
            <p>We opened Ember &amp; Crumb because mornings deserve a place to land. Every day starts before sunrise: dough folded by hand, coffee dialed in, windows fogging at the edges.</p>
            <p>Our menu follows the seasons and our neighbors. Come for the bun, stay for the second cup, leave with a loaf for later.</p>
          </div>
          <a href="#visit" className="link-arrow mt-9 inline-flex items-center gap-3 text-sm font-semibold text-[#a74b35]" data-testid="link-story-visit">Come say hello <span>→</span></a>
        </div>
      </section>

      <section id="menu" className="bg-[#342a21] px-5 py-24 text-[#f8f1e5] sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="reveal">
              <p className="eyebrow mb-6 text-[#e5b967]">The counter, today</p>
              <h2 className="display text-[clamp(3rem,7vw,6.4rem)] leading-[.86] tracking-[-.06em]">Worth getting<br /><em className="text-[#e5b967]">up for.</em></h2>
            </div>
            <div className="reveal reveal-delay-1 max-w-[285px] text-sm leading-relaxed text-[#c9bcae]">
              A short menu, made fresh. When something sells out, we’ll be onto the next good thing.
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-2 border-b border-[#62534a] pb-4">
            {(['all', 'bakes', 'coffee'] as const).map((filter) => (
              <button key={filter} onClick={() => setMenuFilter(filter)} className={`rounded-full px-4 py-2 mono text-[10px] uppercase tracking-[.14em] transition ${menuFilter === filter ? 'bg-[#e5b967] text-[#342a21]' : 'text-[#c9bcae] hover:bg-[#4a3c34]'}`} data-testid={`button-filter-${filter}`}>
                {filter === 'all' ? 'Everything' : filter}
              </button>
            ))}
            <span className="ml-auto hidden items-center gap-2 text-[#8f8172] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#e5b967]" /> updated this morning</span>
          </div>
          <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <article key={item.name} className="menu-card reveal group border-b border-[#62534a] py-7" style={{ transitionDelay: `${index * 70}ms` }} data-testid={`card-menu-${item.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="relative mb-5 aspect-[1.55] overflow-hidden bg-[#d8cbbb]">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                    <span className="absolute bottom-4 left-5 mono text-[9px] uppercase tracking-[.16em] text-[#f8f1e5] drop-shadow-md">
                      {item.type === 'coffee' ? 'single origin' : 'made in house'}
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div><h3 className="display text-2xl">{item.name}</h3><p className="mt-1 text-sm text-[#a99a8b]">{item.detail}</p></div>
                  <span className="mono pt-1 text-sm text-[#e5b967]">{item.price}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-5 border-t border-[#62534a] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#a99a8b]">The menu changes with the farmers market.</p>
            <a href="#visit" className="link-arrow inline-flex items-center gap-3 text-sm font-semibold text-[#e5b967]" data-testid="link-full-menu">Plan your visit <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-10 md:grid-cols-[1.1fr_.9fr] md:items-center md:gap-20 md:py-36 lg:px-16">
        <div className="reveal">
          <p className="eyebrow mb-6 text-[#a74b35]">Coffee, with a point of view</p>
          <h2 className="display max-w-[690px] text-[clamp(2.8rem,6vw,5.5rem)] leading-[.92] tracking-[-.055em]">We like our coffee<br /><em className="text-[#a74b35]">bright, not loud.</em></h2>
          <p className="mt-8 max-w-[480px] text-lg leading-[1.55] text-[#6f6255]">We work with small lots from people who care for the soil as much as the cup. Brewed to bring the good parts forward.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border border-[#cdbfae] px-4 py-2 mono text-[10px] uppercase tracking-[.12em] text-[#6f6255]">Rwanda · honey</span>
            <span className="rounded-full border border-[#cdbfae] px-4 py-2 mono text-[10px] uppercase tracking-[.12em] text-[#6f6255]">Guatemala · washed</span>
          </div>
        </div>
        <div className="reveal reveal-delay-1 relative mx-auto w-full max-w-[450px]">
          <div className="relative aspect-square rounded-full border border-[#cdbfae] p-5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#d99b48] text-center">
              <div className="mb-4 h-20 w-20 rounded-full border-[10px] border-[#342a21] bg-[#a74b35] shadow-inner" />
              <p className="eyebrow text-[#342a21]">Today’s pour</p>
              <p className="display mt-2 text-3xl text-[#342a21]">Rwanda Gasharu</p>
              <p className="mt-2 text-sm text-[#342a21]/70">black tea · apricot · cacao</p>
            </div>
          </div>
          <div className="absolute -right-2 top-12 rotate-6 rounded-sm bg-[#556148] px-4 py-3 text-[#f5eddf] shadow-[4px_5px_0_rgba(52,42,33,.12)] sm:-right-8"><span className="mono text-[10px] uppercase tracking-[.12em]">Ask us to brew it</span></div>
        </div>
      </section>

      <section id="visit" className="bg-[#e0d3c1] px-5 py-20 sm:px-10 md:py-28 lg:px-16">
        <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-20">
          <div className="reveal">
            <p className="eyebrow mb-6 text-[#a74b35]">Come by sometime</p>
            <h2 className="display text-[clamp(3rem,7vw,6rem)] leading-[.86] tracking-[-.06em]">Your corner<br /><em className="text-[#a74b35]">is waiting.</em></h2>
            <div className="mt-10 space-y-5 text-[#6f6255]">
              <div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-[#a74b35]" size={20} strokeWidth={1.5} /><p>2148 Telegraph Avenue<br />Oakland, California 94612</p></div>
              <div className="flex gap-4"><Clock3 className="mt-1 shrink-0 text-[#a74b35]" size={20} strokeWidth={1.5} /><p>Monday — Sunday<br />7am — 3pm</p></div>
            </div>
            <button onClick={openReservation} className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#a74b35] px-6 py-3.5 text-sm font-semibold text-[#f8f1e5] transition hover:bg-[#813a2a]" data-testid="button-visit-reserve">Reserve a table <ArrowRight size={16} /></button>
          </div>
          <div className="reveal reveal-delay-1 grid grid-cols-2 gap-3 sm:gap-5">
            <div className="flex min-h-[230px] flex-col justify-between bg-[#556148] p-5 text-[#f5eddf] sm:min-h-[280px] sm:p-7"><span className="eyebrow text-[#e5b967]">The long table</span><p className="display text-2xl leading-tight sm:text-3xl">Come alone.<br />Leave less so.</p></div>
            <div className="mt-10 flex min-h-[230px] flex-col justify-between bg-[#a74b35] p-5 text-[#f5eddf] sm:mt-16 sm:min-h-[280px] sm:p-7"><span className="eyebrow text-[#f0c590]">To take away</span><p className="display text-2xl leading-tight sm:text-3xl">One for now.<br />One for later.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-[#d99b48] px-5 py-16 sm:px-10 md:py-20 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-[520px] reveal"><p className="eyebrow mb-5 text-[#342a21]">A note from the counter</p><h2 className="display text-4xl leading-[.96] tracking-[-.04em] sm:text-5xl">“The morning is yours. We’re just here to make it taste better.”</h2><p className="mt-4 text-sm text-[#342a21]/70">— Mara, co-owner &amp; bread person</p></div>
          <form onSubmit={(event) => { event.preventDefault(); setNewsletterSent(true); }} className="w-full max-w-[420px] reveal reveal-delay-1" data-testid="form-newsletter">
            <label htmlFor="newsletter-email" className="eyebrow mb-3 block text-[#342a21]">Letters from the bakery</label>
            <p className="mb-5 max-w-[340px] text-sm leading-relaxed text-[#342a21]/70">A monthly note about what’s in the oven, where we’re wandering, and what to pour next.</p>
            {newsletterSent ? (
              <div className="flex items-center gap-3 border-b border-[#342a21] py-3 text-sm font-semibold" data-testid="status-newsletter-success"><Check size={17} /> You’re on the list. See you soon.</div>
            ) : (
              <div className="flex border-b border-[#342a21]">
                <input id="newsletter-email" type="email" required placeholder="your@email.com" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#342a21]/55" data-testid="input-newsletter-email" />
                <button type="submit" className="mono px-1 py-3 text-[10px] uppercase tracking-[.13em] transition hover:text-[#a74b35]" data-testid="button-newsletter-submit">Subscribe <span className="ml-2">→</span></button>
              </div>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-[#342a21] px-5 py-12 text-[#f5eddf] sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div><a href="#top" className="display text-3xl" data-testid="link-footer-home">Ember &amp; Crumb</a><p className="mt-4 max-w-[250px] text-sm leading-relaxed text-[#a99a8b]">A neighborhood bakery and coffee bar for slow mornings and good company.</p></div>
          <div><p className="eyebrow mb-4 text-[#e5b967]">Explore</p><div className="flex flex-col gap-2 text-sm text-[#c9bcae]"><a href="#story" className="hover:text-[#e5b967]" data-testid="link-footer-story">Our story</a><a href="#menu" className="hover:text-[#e5b967]" data-testid="link-footer-menu">Today’s menu</a><a href="#visit" className="hover:text-[#e5b967]" data-testid="link-footer-visit">Visit us</a></div></div>
          <div><p className="eyebrow mb-4 text-[#e5b967]">Say hello</p><div className="flex flex-col gap-2 text-sm text-[#c9bcae]"><a href="mailto:hello@emberandcrumb.com" className="hover:text-[#e5b967]" data-testid="link-footer-email">hello@emberandcrumb.com</a><a href="tel:+15105550184" className="hover:text-[#e5b967]" data-testid="link-footer-phone">(510) 555-0184</a><a href="https://instagram.com" target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-2 hover:text-[#e5b967]" data-testid="link-footer-instagram"><Instagram size={15} /> @emberandcrumb</a></div></div>
          <div className="self-end text-right"><p className="mono text-[10px] uppercase tracking-[.13em] text-[#8f8172]">Oakland, CA</p><p className="mt-2 display text-xl text-[#e5b967]">Made slowly.</p></div>
        </div>
        <div className="mx-auto mt-12 flex max-w-[1440px] justify-between border-t border-[#62534a] pt-5 text-[10px] uppercase tracking-[.12em] text-[#8f8172]"><span>© 2024 Ember &amp; Crumb</span><span className="hidden sm:block">Good bread. Good company.</span></div>
      </footer>

      {reservationOpen && (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-[#342a21]/55 p-0 sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label="Reserve a table" data-testid="dialog-reservation">
          <div className="relative w-full max-w-[520px] rounded-t-3xl bg-[#f8f1e5] p-7 text-[#342a21] sm:rounded-3xl sm:p-10">
            <button onClick={() => setReservationOpen(false)} className="absolute right-5 top-5 rounded-full border border-[#d8cbbb] p-2 transition hover:bg-[#e9dfcf]" aria-label="Close reservation dialog" data-testid="button-close-reservation"><X size={17} /></button>
            {reservationSent ? (
              <div className="py-10 text-center"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#556148] text-[#f8f1e5]"><Check size={25} /></div><h3 className="display text-4xl">Table held.</h3><p className="mx-auto mt-3 max-w-[300px] text-sm leading-relaxed text-[#6f6255]">We’ll see you soon. Keep an eye on your inbox for a little confirmation.</p><button onClick={() => setReservationOpen(false)} className="mt-7 rounded-full bg-[#342a21] px-6 py-3 text-sm font-semibold text-[#f8f1e5]" data-testid="button-reservation-done">Done</button></div>
            ) : (
              <>
                <p className="eyebrow mb-4 text-[#a74b35]">Stay a while</p><h3 className="display text-4xl leading-none sm:text-5xl">Save a spot<br /><em className="text-[#a74b35]">for your morning.</em></h3>
                <form onSubmit={(event) => { event.preventDefault(); setReservationSent(true); }} className="mt-8 space-y-5" data-testid="form-reservation">
                  <div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="eyebrow mb-2 block text-[#6f6255]">Your name</span><input required type="text" className="w-full border-b border-[#cdbfae] bg-transparent py-2 outline-none focus:border-[#a74b35]" placeholder="First and last" data-testid="input-reservation-name" /></label><label className="block"><span className="eyebrow mb-2 block text-[#6f6255]">Email</span><input required type="email" className="w-full border-b border-[#cdbfae] bg-transparent py-2 outline-none focus:border-[#a74b35]" placeholder="you@email.com" data-testid="input-reservation-email" /></label></div>
                  <div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="eyebrow mb-2 flex items-center gap-2 text-[#6f6255]"><CalendarDays size={13} /> Date</span><input required type="date" className="w-full border-b border-[#cdbfae] bg-transparent py-2 outline-none focus:border-[#a74b35]" data-testid="input-reservation-date" /></label><label className="block"><span className="eyebrow mb-2 block text-[#6f6255]">Time</span><select className="w-full border-b border-[#cdbfae] bg-transparent py-2 outline-none focus:border-[#a74b35]" defaultValue="9:00 AM" data-testid="select-reservation-time"><option>8:00 AM</option><option>9:00 AM</option><option>10:30 AM</option><option>12:00 PM</option></select></label></div>
                  <div><span className="eyebrow mb-2 block text-[#6f6255]">Party size</span><div className="flex items-center gap-4"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="rounded-full border border-[#cdbfae] p-2 hover:bg-[#e9dfcf]" aria-label="Decrease party size" data-testid="button-decrease-party"><Minus size={15} /></button><span className="w-5 text-center text-sm" data-testid="text-party-size">{quantity}</span><button type="button" onClick={() => setQuantity((value) => Math.min(8, value + 1))} className="rounded-full border border-[#cdbfae] p-2 hover:bg-[#e9dfcf]" aria-label="Increase party size" data-testid="button-increase-party"><Plus size={15} /></button><span className="text-sm text-[#6f6255]">people</span></div></div>
                  <button type="submit" className="mt-2 w-full rounded-full bg-[#a74b35] py-3.5 text-sm font-semibold text-[#f8f1e5] transition hover:bg-[#813a2a]" data-testid="button-submit-reservation">Request a table <ArrowRight className="ml-2 inline-block" size={16} /></button>
                  <p className="text-center text-[11px] text-[#8e7c6b]">For groups larger than eight, please email us directly.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      <a href="#top" className="fixed bottom-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#a74b35] text-[#f8f1e5] shadow-[0_5px_18px_rgba(52,42,33,.18)] transition hover:bg-[#813a2a]" aria-label="Back to top" data-testid="link-back-to-top"><ArrowDown size={17} className="rotate-180" /></a>
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
