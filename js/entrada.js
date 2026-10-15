// A raiz do GitHub Pages apenas encaminha para a primeira página.
const destination = new URL('html/sobre.html', location.href);
destination.search = location.search;
location.replace(destination.href);
