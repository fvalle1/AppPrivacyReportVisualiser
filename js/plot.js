function plotApps() {
    let PLOT_APPS = document.getElementById('plot_apps');
    getParsedData().then(data => {
        apps = {};
        for (var i = 0; i < data.length; i++) {
                t = data[i]["accessor"]["identifier"];
            if (apps[t]) {
                apps[t] += 1;
                } else {
                apps[t] = 1;
                }
        }

        X = [];
        names = [];
        Y = [];
        for (var t in apps) {
            names.push(t.split(".").slice(-1)[0]);
            X.push(t);
            Y.push(apps[t]);
        }

        // console.debug(X);

        Plotly.newPlot(PLOT_APPS, [{
            x: X,
            y: Y,
            type: "bar",
            marker: { color: 'blue' },
        }], {
            margin: { t: 0 },
            yaxis: { title: "#" },
            xaxis: { title: "App", tickvals: X, ticktext: names },
        });
    });
}

function plotCategories() {
    let PLOT_CATS = document.getElementById('plot_cats');
    getParsedData().then(data => {
        categories = {};
        for (var i = 0; i < data.length; i++) {
            if (data[i].type) {
                t = data[i]["category"];
                if (categories[t]) {
                    categories[t] += 1;
                } else {
                    categories[t] = 1;
                }
            }
        }

        X = [];
        Y = [];
        for (var t in categories) {
            X.push(t);
            Y.push(categories[t]);
        }

        Plotly.newPlot(PLOT_CATS, [{
            x: X,
            y: Y,
            type: "bar",
            marker: {color: 'blue'},
        }], {
            margin: { t: 0 },
            yaxis: {title: "#"},
        });
    });
}

function plotAppsCategories() {
    let PLOT_APPS = document.getElementById('plot_appscats');
    getParsedData().then(data => {
        apps = {};
        for (var i = 0; i < data.length; i++) {
            app = data[i]["accessor"]["identifier"];
            cat = data[i]["category"];
            if (apps[app]) {
                if (apps[app][cat]) {
                    apps[app][cat] += 1;
                }else{
                    apps[app][cat] = 1;
                }
            } else {
                apps[app] = {};
                apps[app][cat] = 1;
            }
        }

        plot_data = []
        for (var app in apps) {
            X = [];
            Y = [];
            var app_name = app.split(".").slice(-1)[0];
            for (var t in apps[app]) {
                X.push(t);
                Y.push(apps[app][t]);
            }
            plot_data.push(
                {
                    x: X,
                    y: Y,
                    name: app_name,
                    type: "bar",
                    marker: { },
                }
            )
        }

        Plotly.newPlot(PLOT_APPS, plot_data, {
            margin: { t: 0 },
            yaxis: { title: "#" },
            xaxis: { title: "Category" },
        });
    });
}

function plotAppsCategoriesTime() {
    let PLOT_APPS = document.getElementById('plot_appscatstime');
    getParsedData().then(data => {
        apps = {};
        for (var i = data.length - 1; i >= 0; i--) {
            time = (new Date(data[i]["timeStamp"])).toDateString();
            app = data[i]["accessor"]["identifier"];
            if (apps[app]) {
                if (apps[app][time]) {
                    apps[app][time] += 1;
                }else{
                    apps[app][time] = 1;
                }
            } else {
                apps[app] = {};
                apps[app][time] = 1;
            }
        }
        console.debug(apps);

        plot_data = []
        for (var app in apps) {
            X = [];
            Y = [];
            var app_name = app.split(".").slice(-1)[0];
            for (var t in apps[app]) {
                X.push(new Date(t));
                Y.push(apps[app][t]);
            }
            plot_data.push(
                {
                    x: X,
                    y: Y,
                    name: app_name,
                    marker: { size: 15},
                }
            )
        }

        Plotly.newPlot(PLOT_APPS, plot_data, {
            margin: { t: 0 },
            yaxis: { title: "#" },
            xaxis: { title: "Time" },
        });
    });
}

function plotCategoriesTime() {
    let PLOT_APPS = document.getElementById('plot_catstime');
    getParsedData().then(data => {
        categories = {};
        for (var i = data.length - 1; i >= 0; i--) {
            time = (new Date(data[i]["timeStamp"])).toDateString();
            cat = data[i]["category"];
            if (categories[cat]) {
                if (categories[cat][time]) {
                    categories[cat][time] += 1;
                }else{
                    categories[cat][time] = 1;
                }
            } else {
                categories[cat] = {};
                categories[cat][time] = 1;
            }
        }

        plot_data = []
        for (var cat in categories) {
            X = [];
            Y = [];
            for (var t in categories[cat]) {
                X.push(new Date(t));
                Y.push(categories[cat][t]);
            }
            plot_data.push(
                {
                    x: X,
                    y: Y,
                    name: cat,
                    mode: "markers+lines",
                    marker: {size:15},
                }
            )
        }

        Plotly.newPlot(PLOT_APPS, plot_data, {
            margin: { t: 0 },
            yaxis: { title: "#" },
            xaxis: { title: "Time" },
        });
    });
}

function plotAll() {
    plotApps();
    plotCategories();
    plotAppsCategories();
    plotAppsCategoriesTime();
    plotCategoriesTime();
}