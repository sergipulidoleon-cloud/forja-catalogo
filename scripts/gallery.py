import html
import os

def poster_file(slug):
    # AVIF once the hero has been redone; WebP for the rest.
    return 'poster.avif' if os.path.exists(f'webs/{slug}/poster.avif') else 'poster.webp'
demos = [
 ("clinica-dental-bellvitge","Clínica Dental Bellvitge","Clínica dental","Bellvitge","#E6F1F0","#0E3B43"),
 ("cal-siscu","Cal Síscu","Marisquería","Collblanc","#12302A","#C6A15B"),
 ("raco-del-cargol","El Racó del Cargol","Cocina catalana","Collblanc","#4A1424","#E3A72F"),
 ("la-cocina-de-graciela","La Cocina de Graciela","Cocina mexicana","Collblanc-La Torrassa","#D6246E","#FFFFFF"),
 ("barber-shop-hospitalet","Barber Shop Hospitalet","Barbería","Santa Eulàlia","#3A0E12","#C9A55A"),
 ("casa-varela-1986","Casa Varela 1986","Arroces y marisco","L'Hospitalet","#FBFBF8","#1D4E89"),
 ("clinica-dental-pp","Clínica Dental P&P","Clínica dental familiar","Santa Eulàlia","#E9E4F7","#7B2D6B"),
 ("funnyschool","Funnyschool","Inglés infantil","Bellvitge","#8FD3F4","#1B2A57"),
 ("hospitalet-dental","Hospitalet Dental","Clínica dental","Centre","#13202E","#D9C6A5"),
 ("debut","Debut","Cocina de autor","La Torrassa","#2E3236","#F2F1EC"),
 ("mar-azul","Mar Azul","Cocina peruana","Collblanc","#0B2E59","#F2A900"),
 ("j-jowel-barber-studio","J Jowel Barber Studio","Barbería urbana","La Florida","#8A8D8F","#1C1D1F"),
 ("centre-veterinari-santa-eulalia","Centre Veterinari Santa Eulàlia","Veterinaria","Santa Eulàlia","#CFE8F5","#22603F"),
 ("buda-tattoo","Buda Tattoo","Tatuaje","La Florida","#E9E3D3","#1B1E2B"),
 ("fisal-fisioterapia","FISAL","Fisioterapia","Bellvitge","#EEF2F7","#164884"),
 ("english-of-course","English Of Course!","Academia de inglés","La Florida y Collblanc","#F4F6FA","#13294B"),
 ("autoescuela-sunye","Autoescuela Sunyé","Autoescuela","Collblanc","#2B2D31","#FFC72C"),
 ("talleres-ronda","Talleres Ronda","Taller mecánico","La Torrassa","#1B3F73","#FF7A00"),
 ("lessencia-yoga-pilates","l'Essència Yoga & Pilates","Yoga y pilates","Centre","#F5F5F2","#5B5A7A"),
 ("ben-fi","Ben Fi","Estética","La Florida","#F3D9D3","#46624F"),
]
cards = []
for i,(slug,name,sector,barrio,bg,fg) in enumerate(demos,1):
    cards.append(f'''      <li class="card" style="--card-bg:{bg};--card-fg:{fg}">
        <a href="./webs/{slug}/" class="card__link">
          <span class="card__art"><img src="./webs/{slug}/{poster_file(slug)}" alt="" loading="lazy" decoding="async" width="600" height="420" /></span>
          <span class="card__meta">
            <span class="card__rank">{i}</span>
            <span class="card__name">{html.escape(name)}</span>
            <span class="card__info">{html.escape(sector)}, {html.escape(barrio)}</span>
          </span>
        </a>
      </li>''')
page = f'''<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>Veinte webs para L'Hospitalet · Propuestas de diseño (demos no oficiales)</title>
    <meta name="description" content="Propuesta de diseño — demo no oficial. Catálogo de 20 conceptos de web para negocios de L'Hospitalet de Llobregat, por Sergi Pulido León." />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <meta name="theme-color" content="#16130f" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%2316130f'/%3E%3Ctext x='16' y='22' font-family='Arial' font-weight='700' font-size='15' text-anchor='middle' fill='%23f2ede4'%3E20%3C/text%3E%3C/svg%3E" />
    <script type="module" src="./scripts/gallery-entry.ts"></script>
    <style>
      :root {{ --ink:#16130f; --paper:#f2ede4; --muted:#5b554c; --line:rgb(22 19 15 / .14); --gutter:clamp(16px,4vw,48px); }}
      *,*::before,*::after {{ box-sizing:border-box; }}
      html {{ -webkit-text-size-adjust:100%; }}
      body {{ margin:0; background:var(--paper); color:var(--ink); font:400 1.02rem/1.55 'Bricolage Grotesque Variable', system-ui, sans-serif; }}
      ::selection {{ background:var(--ink); color:var(--paper); }}
      :focus-visible {{ outline:2px solid var(--ink); outline-offset:3px; }}
      header {{ width:min(1280px,100% - 2*var(--gutter)); margin:0 auto; padding:clamp(40px,7vw,96px) 0 clamp(28px,4vw,48px); display:grid; gap:18px; }}
      h1 {{ margin:0; font-size:clamp(2.8rem,8vw,6.4rem); line-height:.92; letter-spacing:-.04em; font-weight:700; font-stretch:80%; max-width:12ch; }}
      header p {{ margin:0; max-width:56ch; color:var(--muted); font-size:1.12rem; text-wrap:pretty; }}
      .grid {{ list-style:none; margin:0 auto; padding:0 0 clamp(60px,8vw,110px); width:min(1280px,100% - 2*var(--gutter)); display:grid; grid-template-columns:repeat(auto-fill,minmax(min(100%,290px),1fr)); gap:clamp(14px,2vw,22px); }}
      .card__link {{ display:grid; height:100%; text-decoration:none; color:inherit; border-radius:18px; overflow:hidden; background:#fff; box-shadow:0 1px 0 var(--line); transition:transform 220ms cubic-bezier(.23,1,.32,1), box-shadow 220ms ease; }}
      .card__link:active {{ transform:scale(.98); }}
      @media (hover:hover) and (pointer:fine) {{ .card__link:hover {{ transform:translateY(-3px); box-shadow:0 18px 30px -18px rgb(22 19 15 / .45); }} }}
      .card__art {{ display:block; aspect-ratio:10/7; background:var(--card-bg); }}
      .card__art img {{ width:100%; height:100%; object-fit:contain; padding:6%; }}
      .card__meta {{ display:grid; grid-template-columns:auto 1fr; column-gap:12px; row-gap:2px; padding:14px 16px 16px; align-items:baseline; }}
      .card__rank {{ grid-row:span 2; font-weight:700; font-size:1.3rem; font-variant-numeric:tabular-nums; color:var(--muted); }}
      .card__name {{ font-weight:700; font-size:1.12rem; letter-spacing:-.01em; }}
      .card__info {{ font-size:.9rem; color:var(--muted); }}
      footer {{ padding:28px var(--gutter) 60px; border-top:1px solid var(--line); color:var(--muted); font-size:.88rem; }}
      footer p {{ margin:0 auto; width:min(1280px,100%); max-width:80ch; }}
      @media (prefers-reduced-motion:reduce) {{ .card__link {{ transition:none; }} }}
    </style>
  </head>
  <body>
    <header>
      <h1>Veinte webs para L’Hospitalet</h1>
      <p>Propuestas de diseño para negocios de Bellvitge, Collblanc, La Torrassa, Santa Eulàlia, La Florida y el Centre. Cada una tiene su propio mundo visual, una pieza 3D interactiva, versión en castellano y catalán, y está pensada primero para el móvil.</p>
    </header>
    <main>
      <ol class="grid">
{chr(10).join(cards)}
      </ol>
    </main>
    <footer>
      <p><strong>Propuesta de diseño — demo no oficial.</strong> Estas páginas son conceptos de diseño de Sergi Pulido León. No son las webs oficiales de los negocios ni están afiliadas a ellos. Fotos, reseñas y precios son de ejemplo.</p>
    </footer>
  </body>
</html>
'''
open('index.html','w').write(page)
print('ok', len(demos))
