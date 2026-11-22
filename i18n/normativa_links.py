#!/usr/bin/env python3
"""Enlaza desde cada portada de idioma (/de/, /fr/...) sus presentaciones de normativa en 4 minutos.
Idempotente. Volver a ejecutar después de i18n/build.py, que regenera las portadas."""
import os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HUB = {'de': 'vorschriften', 'fr': 'reglementation', 'fr-be': 'reglementation', 'it': 'normativa', 'nl': 'regelgeving', 'nl-be': 'regelgeving', 'pt': 'normas', 'da': 'regler'}
SLUGS = {'de': ['dsgvo', 'ehds', 'ki-verordnung', 'nis2', 'data-act-dga', 'c5-iso-27001'],
         'fr': ['rgpd', 'ehds', 'reglement-ia', 'nis2', 'data-act-dga', 'secnumcloud-iso-27001'],
         'fr-be': ['rgpd', 'ehds', 'reglement-ia', 'nis2', 'data-act-dga', 'cyfun-iso-27001'],
         'it': ['gdpr', 'ehds', 'regolamento-ia', 'nis2', 'data-act-dga', 'acn-iso-27001'],
         'nl': ['avg', 'ehds', 'ai-verordening', 'nis2', 'data-act-dga', 'bio-iso-27001'],
         'nl-be': ['avg', 'ehds', 'ai-verordening', 'nis2', 'data-act-dga', 'cyfun-iso-27001'],
         'pt': ['rgpd', 'ehds', 'regulamento-ia', 'nis2', 'data-act-dga', 'qnrcs-iso-27001'],
         'da': ['gdpr', 'ehds', 'ai-forordningen', 'nis2', 'data-act-dga', 'iso-27001']}
LABEL = {'de': 'Vorschriften in 4 Minuten', 'fr': 'La réglementation en 4 minutes', 'fr-be': 'La réglementation en 4 minutes', 'it': 'La normativa in 4 minuti',
         'nl': 'Regelgeving in 4 minuten', 'nl-be': 'Regelgeving in 4 minuten', 'pt': 'As normas em 4 minutos', 'da': 'Reglerne på 4 minutter'}
SEE = {'de': 'Die sechs Vorschriften in je 4 Minuten erklärt, mit animierter Präsentation und Transkript →',
       'fr': 'Les six textes expliqués en 4 minutes, avec présentation animée et transcription →',
       'it': 'Le sei norme spiegate in 4 minuti, con presentazione animata e trascrizione →',
       'nl': 'De zes regels uitgelegd in 4 minuten, met geanimeerde presentatie en transcriptie →',
       'pt': 'As seis normas explicadas em 4 minutos, com apresentação animada e transcrição →',
       'da': 'De seks regelsæt forklaret på 4 minutter, med animeret præsentation og transskription →'}
for l, hub in HUB.items():
    p = os.path.join(ROOT, l, 'index.html'); s = open(p, encoding='utf-8').read(); base = f'/{l}/{hub}/'
    m = re.search(r'<ul class="norm-list">(.*?)</ul>', s, re.S)
    lis = re.findall(r'<li><b>(.*?)</b>', m.group(1))
    body = m.group(1)
    for i, b in enumerate(lis[:6]):
        txt = re.sub(r'<[^>]+>', '', b)
        body = body.replace(f'<li><b>{b}</b>', f'<li><b><a href="{base}{SLUGS[l][i]}/">{txt}</a></b>', 1)
    s = s[:m.start(1)] + body + s[m.end(1):]
    see = f'<p class="sub" style="margin-top:14px"><a href="{base}">{SEE[l if l in SEE else l[:2]]}</a></p>'
    if f'<a href="{base}">' not in s[m.start():m.start() + len(body) + 600]:
        s = re.sub(r'(<ul class="norm-list">.*?</ul>)', lambda mm: mm.group(1) + '\n      ' + see, s, count=1, flags=re.S)
    nav = f'<li><a href="{base}">{LABEL[l]}</a></li>'
    if nav not in s:
        s = re.sub(r'(<ul id="m3">.*?)(<li><a href="https://www\.softwareinabox\.eu/)', lambda mm: mm.group(1) + nav + mm.group(2), s, count=1, flags=re.S)
    foot = f'<a href="{base}">{LABEL[l]}</a><a href="#normas">'
    if foot not in s:
        s = re.sub(r'(<div><h4>[^<]*</h4>)(<a href="#normas">)', lambda mm: mm.group(1) + foot[:-len('<a href="#normas">')] + mm.group(2), s, count=1)
    open(p, 'w', encoding='utf-8').write(s)
    print(l, 'ok')
