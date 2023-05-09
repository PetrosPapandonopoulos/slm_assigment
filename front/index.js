function onLoadDriversNames() {
    fetch("http://127.0.0.1:3000/drivers", {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {

        const drivers = response;
        var driver_list = document.getElementById('drivers');
        var option;

        drivers['drivers'].forEach(driver => {
            option = document.createElement("option");
            option.text = driver['name'];
            option.value = driver['id']
            driver_list.add(option);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function onDriverSelect() {

    const driverSelect = document.getElementById("drivers");
    const selectedDriverId = driverSelect.options[driverSelect.selectedIndex].value;

    fetch(`http://127.0.0.1:3000/driver_packages/${selectedDriverId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {

        const packages = response['packages'];
        var listItem;
        var status_message;

        //clear previous packages
        document.getElementById('packages').innerHTML = '';

        packages.sort((a, b) => a.voucher.localeCompare(b.voucher));

        packages.forEach((package, index) => {

            listItem = document.createElement("li");

            status_message = package.state == 1 ? "Scanned" : "Not scanned";

            listItem.innerHTML = `<strong>Package</strong>: ${index+1} \
                                  <strong>Voucher</strong>: ${package.voucher} \
                                  - <strong>Postcode</strong>: ${package.postcode} \
                                  - <strong>Status</strong>: ${status_message}`;
            document.getElementById('packages').appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function scanPackage() {
    const voucher = document.getElementById("voucherInput");
    fetch('http://127.0.0.1:3000/scan_package', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "voucher": voucher.value })
    })
    .then(response => {
        if (!response.ok) {
            alert("Voucher not found");
        }
        onDriverSelect();
        voucher.value = '';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function resetStates() {
    fetch("http://127.0.0.1:3000/reset_states", {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => onDriverSelect())
    .catch(error => {
        console.error('Error:', error);
    });
}


const voucherInput = document.getElementById("voucherInput");
voucherInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    scanPackage();
  }
});