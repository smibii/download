const $checkUrl = function (url) {
    let url_regex = /^https?:\/\/[a-zA-Z0-9-_]+?\.?[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+[a-zA-Z0-9-$_.+!*'(),/&?=:%]+$/
    if (!url.match(url_regex)) throw new Error('String is not a valid URL!\nUrl: ' + url)
    try {
      fetch(url);
    } catch (err) {
      console.log(err);
    }
}

const $downloadFromUrl = function (url) {
    let filename = url.replace(/^.+\//, '') || 'New File.file'
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }, 0)
}

String.prototype.download = function () {
    let url = this
    $checkUrl(url)
    $downloadFromUrl(url)
}

class Download {
    /**
     * @constructor
     * @param {string} URL
     */
    constructor (url = '') {
        $checkUrl(url)
        $downloadFromUrl(url)
    }
}
