const deleteUsers = () => {
    let dataToDelete = []
    document.querySelectorAll('.checkthis').forEach(item => {
        if (item.checked) dataToDelete.push(item.id)
    })

    const data = new URLSearchParams();
    data.append('dataToDelete', JSON.stringify(dataToDelete));

    fetch("users/delete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
    }).then(resp => window.location.reload())

}
document.addEventListener('DOMContentLoaded', function () {
    const tableBodyCheckBoxes = document.querySelectorAll('.checkthis');
    const deleteButton = document.getElementById('deleteButton');
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
        } else {
            deleteButton.classList.add('disabled');
        }

    };

    checkAll.addEventListener('click', function () {
        if (checkAll.checked) {
            deleteButton.classList.remove('disabled');
            let checkboxes = document.querySelectorAll(
                '#mytable input[type=checkbox]',
            );
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
            });
        } else {
            deleteButton.classList.add('disabled');
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