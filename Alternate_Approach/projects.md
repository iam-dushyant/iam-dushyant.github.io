---
layout: page
title: Projects
permalink: /projects/
---

<div class="card" style="margin-bottom:16px;">
  <label for="project-search">Search</label><br>
  <input id="project-search" type="text" placeholder="Search projects..." style="width:100%;padding:10px;border-radius:10px;border:1px solid #2a2f37;background:#0f1218;color:#e6e6e6;">
  <div style="height:10px;"></div>
  <label for="tech-filter">Filter by tech</label><br>
  <select id="tech-filter" style="width:100%;padding:10px;border-radius:10px;border:1px solid #2a2f37;background:#0f1218;color:#e6e6e6;">
    <option value="">All</option>
    {%- assign alltech = "" | split: "" -%}
    {%- for pr in site.projects -%}
      {%- assign alltech = alltech | concat: pr.tech -%}
    {%- endfor -%}
    {%- assign uniq = alltech | uniq | sort -%}
    {%- for t in uniq -%}
      <option value="{{ t }}">{{ t }}</option>
    {%- endfor -%}
  </select>
</div>

<div class="grid">
{%- assign sorted = site.projects | sort: "order" -%}
{%- for p in sorted -%}
  <article class="card project-card" data-search="{{ p.title }} {{ p.summary }} {{ p.tech | join: ' ' }}" data-tech="{{ p.tech | join: ',' }}">
    <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
    <p>{{ p.summary }}</p>
    <p>
      {%- for t in p.tech -%}
        <span class="badge">{{ t }}</span>
      {%- endfor -%}
    </p>
    <p>
      {%- if p.live_url -%}<a href="{{ p.live_url }}" target="_blank">Live</a> · {%- endif -%}
      <a href="{{ p.repo_url }}" target="_blank">Code</a>
    </p>
  </article>
{%- endfor -%}
</div>

<script src="{{ '/assets/js/projects.js' | relative_url }}"></script>
