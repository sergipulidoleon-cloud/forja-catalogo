import json,sys,urllib.request,os
# python3 scripts/credits.py <slug> <uid>[,<uid>...] [polyhaven:<hdri>...]
slug=sys.argv[1]; items=sys.argv[2:]
lines=["# Créditos de los recursos 3D","","Solo se usan recursos con licencia CC0 o CC-BY. Los que piden atribución la llevan también en el pie de la web.",""]
for it in items:
    kind,ident=it.split(':',1)
    if kind=='sketchfab':
        m=json.load(urllib.request.urlopen(f"https://api.sketchfab.com/v3/models/{ident}"))
        lines += [f"## {m['name']}", f"- Fuente: Sketchfab, https://sketchfab.com/3d-models/{ident}", f"- Autor: {m['user']['displayName']} (@{m['user']['username']})", f"- Licencia: {m['license']['label']}", f"- Uso: hero 3D. Modelo simplificado y recomprimido (Meshopt + KTX2); sin cambios de forma.", ""]
    elif kind=='polyhaven':
        lines += [f"## HDRI {ident}", f"- Fuente: Poly Haven, https://polyhaven.com/a/{ident}", "- Licencia: CC0 (dominio público)", "- Uso: iluminación de la escena, reducido a 256 × 128 px.", ""]
open(f"webs/{slug}/assets/CREDITOS.md","w").write("\n".join(lines))
print(open(f"webs/{slug}/assets/CREDITOS.md").read())
