// ===============================
// FUNÇÃO GLOBAL – MUDA O FUNDO
// ===============================
function alterarCorFundo(clima) {
    let bodyBg = '';
    let tempBg = '';

    // ☀ SOL / CÉU LIMPO
    if (clima === 'clear') {
        bodyBg = 'linear-gradient(135deg, #fff7cc, #ffef99)';
        tempBg = 'linear-gradient(135deg, #facc15, #eab308)';
    }

    // ☁ NUBLADO
    else if (clima === 'clouds') {
        bodyBg = 'linear-gradient(135deg, #e0f2fe, #f0f9ff)';
        tempBg = 'linear-gradient(135deg, #60a5fa, #3b82f6)';
    }

    // 🌧 CHUVA / TEMPESTADE
    else if (
        clima === 'rain' ||
        clima === 'drizzle' ||
        clima === 'thunderstorm'
    ) {
        bodyBg = 'linear-gradient(135deg, #e5e7eb, #cbd5e1)';
        tempBg = 'linear-gradient(135deg, #2563eb, #1e40af)';
    }

    // ❄ NEVE
    else if (clima === 'snow') {
        bodyBg = 'linear-gradient(135deg, #f8fafc, #e2e8f0)';
        tempBg = 'linear-gradient(135deg, #38bdf8, #0ea5e9)';
    }

    // 🌈 PADRÃO
    else {
        bodyBg = 'linear-gradient(135deg, #eef2ff, #e0e7ff)';
        tempBg = 'linear-gradient(135deg, #6366f1, #4f46e5)';
    }

    document.body.style.background = bodyBg;
    document.querySelector('#temp').style.background = tempBg;
}

// ===============================
// SUBMIT DO FORMULÁRIO
// ===============================
document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        cityName
    )}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
            weatherMain: json.weather[0].main.toLowerCase()
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`
            Não foi possível localizar...
            <img src="src/images/404.svg"/>
        `);
    }
});

// ===============================
// MOSTRAR INFORMAÇÕES
// ===============================
function showInfo(json) {
    showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML =
        `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML =
    `${Math.round(json.temp)} <sup>C°</sup>`;

    document.querySelector('#temp_description').innerHTML =
        json.description;

    document.querySelector('#temp_img').setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );

    document.querySelector('#temp_max').innerHTML =
    `${Math.round(json.tempMax)} <sup>C°</sup>`;


    document.querySelector('#temp_min').innerHTML =
    `${Math.round(json.tempMin)} <sup>C°</sup>`;


    document.querySelector('#humidity').innerHTML =
        `${json.humidity}%`;

    document.querySelector('#wind').innerHTML =
        `${json.windSpeed.toFixed(1)} km/h`;

    // 🔥 CHAMADA CORRETA
    alterarCorFundo(json.weatherMain);
}

// ===============================
// ALERTA
// ===============================
function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}
