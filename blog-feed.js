document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("blog-posts");

    if (!container) return;

    const label = container.dataset.label;

    const title = container.dataset.title || "También puede interesarle";

    const url = `https://blog.mgabogado.com.ar/feeds/posts/default/-/${encodeURIComponent(label)}?alt=json`;

    fetch(url)
        .then(r => r.json())
        .then(data => {

            if (!data.feed.entry) {
                container.innerHTML = "";
                return;
            }

            let html = `<h2 class="related-title">${title}</h2><div class="related-grid">`;

            data.feed.entry.slice(0,3).forEach(post=>{

                let enlace="";

                post.link.forEach(l=>{
                    if(l.rel==="alternate") enlace=l.href;
                });

                const titulo=post.title.$t;

                const fecha=new Date(post.published.$t);

                const fechaTexto=fecha.toLocaleDateString("es-AR",{
                    day:"numeric",
                    month:"long",
                    year:"numeric"
                });

                let resumen="";

                if(post.summary){

                    resumen=post.summary.$t
                    .replace(/<[^>]*>?/gm,'')
                    .substring(0,140)+"...";

                }

                let imagen="";

                if(post.media$thumbnail){

                    imagen=post.media$thumbnail.url.replace("s72-c","s800");

                }else{

                    image = media ? media.url : "images/martin-garcia.webp";

                }

                html+=`

                <article class="related-card">

                    <img src="${imagen}" alt="${titulo}">

                    <div class="related-content">

                        <span class="related-date">${fechaTexto}</span>

                        <h3>${titulo}</h3>

                        <p>${resumen}</p>

                        <a href="${enlace}" class="related-button">

                            Leer artículo →

                        </a>

                    </div>

                </article>

                `;

            });

            html+="</div>";

            container.innerHTML=html;

        });

});