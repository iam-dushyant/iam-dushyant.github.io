---
layout: page
title: Blog
permalink: /blog/
---

<div class="grid">
  {%- for post in site.posts -%}
    <article class="card">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
      <p><small>{{ post.date | date_to_string }}</small></p>
    </article>
  {%- endfor -%}
</div>
