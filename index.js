module.exports = (data) => {
    const {html, domain, page_url, results} = data;

    return new Promise(resolve => {
        var result = {
            nextUrls: [],
            exitCode: 0
        }
        psql.connect()
        .then(res => {
            let nextUrls = html.match(/href="(\/[a-zA-Z1-9\/\-]*)"/g) ? html.match(/href="(\/[a-zA-Z1-9\/\-]*)"/g).map(href => href.match(/\/[a-zA-Z1-9\/\-]*/g)[0]).map(href => `${domain}${href.slice(1)}`) :$
            nextUrls = [...new Set(nextUrls)];
            result.nextUrls = nextUrls;
            return html.toLowerCase().match(/vucic|vučić/gi) ? html.toLowerCase().match(/vucic|vučić/gi).length : 0;
        })
        .then(ponavljanja => {
            if (ponavljanja === 0) {
                return false;
            } else {
                return results.push(`Found vučić ${ponavljanja} times on ${page_url}`)
            }
        })
        .then(res => {
            resolve(result);
        })
        .catch(err => {
            logger.error(`Error analising html. ${err.toString()}`);
            resolve(Object.assign(result, {
                exitCode: 1
            }));
        })
    })
}
