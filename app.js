const bootSUREUrl = "https://bs-dev-api.azurewebsites.net/";

const calculate = async () =>  { 

    let select = document.getElementById('taxyear');
    let selected_tax_year = select.options[select.selectedIndex].text;
    effectiveDate = `${selected_tax_year}-04-01`;

    let annual_income = document.getElementById('annualincome').value;
    annual_income = Number(annual_income);
    console.log(typeof(annual_income));
    // Initialize second annual income field
    document.getElementById('annual-income2').value = annual_income;

    let age = document.getElementById('age').value;
    age = Number(age);

    // Make api call to bootsure backend
    const body = {
        "effectiveDate": effectiveDate,
        "input": {
            "TaxableIncome": annual_income,
            "Age": age
        }
    }
    console.log(body);
    
    let tax = 0;
    await axios.post({"url": {
        "raw": `${bootSUREUrl}/api/rating/PERSONALINCOMETAX`,
        "host": [
            `${bootSUREUrl}`
        ],
        "path": [
            "api",
            "rating",
            "PERSONALINCOMETAX"
        ]
    }
}, 
{"body": {
        "mode": "raw",
        "raw": "{\r\n    \"effectiveDate\": effectiveDate,\r\n    \"input\": {\r\n        \"TaxableIncome\": annual_income,\r\n        \"Age\": annual_income\r\n    }\r\n}",
        "options": {
            "raw": {
                "language": "json"
            }
        }
    }}, 
    {"header": [
        { "key": "bootSURE-api-id", "value": "072f058e-c08e-4224-af9a-7ccd54e4392e", "type": "text" }, { "key": "bootSURE-environment-id", "value": "PROD",   "type": "text" }, { "key": "bootSURE-organization-id", "value": "C210E61F-7D38-475C-8AE5-EC1430DCCDC5", "type": "text" } ]}).then(response => {
        console.log(response.data);
        // tax = Number(response.data.output.Tax);
    }).catch(error => {console.log(error)});

    // Pass api annual income result to calculate income function
    // calculateNetIncome(tax)

    // Clear input fields after calculation
    document.getElementById('taxyear').value = '';
    document.getElementById('annualincome').value = "";
    document.getElementById('age').value = "";
}

function calculateNetIncome(taxValue) {
    let annual_income_value = document.getElementById('annual-income2').value;
    let annual_income_tax = taxValue;

    result = 0;
    result = Number(annual_income_value) - Number(annual_income_tax);
    document.getElementById('net-income').value = String(result);
}