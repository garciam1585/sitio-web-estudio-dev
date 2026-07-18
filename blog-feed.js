document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("blog-posts");
    if (!container) return;

    const label = container.dataset.label;
    const title = container.dataset.title || "También puede interesarle";
    
    // Usamos el parámetro 'callback' que permite evitar el bloqueo CORS de Blogger
    const script = document.createElement('script');
    script.src = `https://blog.mgabogado.com.ar/feeds/posts/default/-/${label}?alt=json-in-script&callback=mostrarPosts`;
    document.body.appendChild(script);

    window.mostrarPosts = (data) => {
        if (!data.feed.entry) {
            container.innerHTML = "";
            return;
        }

        let html = `<h2 class="related-title">${title}</h2><div class="related-grid">`;
        data.feed.entry.slice(0, 3).forEach(post => {
            let enlace = post.link.find(l => l.rel === "alternate").href;
            const titulo = post.title.$t;
            const fecha = new Date(post.published.$t).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
            let resumen = post.summary ? post.summary.$t.replace(/<[^>]*>?/gm, '').substring(0, 140) + "..." : "";
            let imagen = post.media$thumbnail ? post.media$thumbnail.url.replace("s72-c", "s1600") : "/images/blog-default.webp";

            html += `<article class="related-card"><img src="${imagen}" alt="${titulo}"><div class="related-content"><span class="related-date">${fecha}</span><h3>${titulo}</h3><p>${resumen}</p><a href="${enlace}" class="related-button">Leer artículo →</a></div></article>`;
        });
        html += "</div>";
        container.innerHTML = html;
    };
});
