const getSelectedCheckBoxIds = () => {
    let selectedids = []
    document.querySelectorAll('.checkthis').forEach(item => {
        if (item.checked) selectedids.push(item.id)
    })

    return selectedids
}

const deleteRequests = () => {
    let dataToDelete = getSelectedCheckBoxIds();

    const data = new URLSearchParams();
    data.append('dataToDelete', JSON.stringify(dataToDelete));

    fetch("requests/delete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
    }).then(resp => window.location.reload())
        .catch(e => console.log(e))

}

const acceptRequests = () => {
    let dataToAccept = getSelectedCheckBoxIds();

    const data = new URLSearchParams();
    data.append('dataToAccept', JSON.stringify(dataToAccept));

    fetch("requests/accept", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
    }).then(resp => window.location.reload())
        .catch(e => console.log(e))

}

const denyRequests = () => {
    let dataToDeny = getSelectedCheckBoxIds();

    const data = new URLSearchParams();
    data.append('dataToDeny', JSON.stringify(dataToDeny));

    fetch("requests/deny", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
    }).then(resp => window.location.reload())
        .catch(e => console.log(e))

}

document.addEventListener('DOMContentLoaded', function () {
    const tableBodyCheckBoxes = document.querySelectorAll('.checkthis');
    const deleteButton = document.getElementById('deleteButton');
    const acceptRequestButton = document.getElementById('acceptRequestButton');
    const denyRequestButton = document.getElementById('denyRequestButton');
    const checkAll = document.querySelector('#mytable #checkall');


    tableBodyCheckBoxes.forEach(item => {
        item.addEventListener('click', () => checkSelectedCheckBoxes());
    });

    const checkSelectedCheckBoxes = () => {
        let isSelectedSomething = false;
        tableBodyCheckBoxes.forEach(item => {
            if (item.checked) isSelectedSomething = true;
        });

        if (isSelectedSomething) {
            deleteButton.classList.remove('disabled')
            acceptRequestButton.classList.remove('disabled')
            denyRequestButton.classList.remove('disabled')
        } else {
            deleteButton.classList.add('disabled');
            acceptRequestButton.classList.add('disabled')
            denyRequestButton.classList.add('disabled')
        }

    };

    checkAll.addEventListener('click', function () {
        if (checkAll.checked) {
            deleteButton.classList.remove('disabled');
            acceptRequestButton.classList.remove('disabled')
            denyRequestButton.classList.remove('disabled')
            let checkboxes = document.querySelectorAll(
                '#mytable input[type=checkbox]',
            );
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
            });
        } else {
            deleteButton.classList.add('disabled');
            acceptRequestButton.classList.add('disabled')
            denyRequestButton.classList.add('disabled')
            let checkboxes = document.querySelectorAll(
                '#mytable input[type=checkbox]',
            );
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
        }
    });

    var tooltips = document.querySelectorAll('[data-toggle=tooltip]');
    tooltips.forEach(function (tooltip) {
        new bootstrap.Tooltip(tooltip);
    });

});