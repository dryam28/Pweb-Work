const deleteData = () => {
    let dataToDelete = []
    document.querySelectorAll('.checkthis').forEach(item => {
        if (item.checked) dataToDelete.push(item.id)
    })

    const data = new URLSearchParams();
    data.append('dataToDelete', JSON.stringify(dataToDelete));

    fetch("workers/delete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
    }).then(resp => window.location.reload())

}
document.addEventListener('DOMContentLoaded', function () {
    const worker = 'dsdsad'
    const tableBodyCheckBoxes = document.querySelectorAll('.checkthis');
    const deleteButton = document.getElementById('deleteButton');
    const exportDataButton = document.getElementById('exportDataButton');
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
            exportDataButton.classList.remove('disabled')
        } else {
            deleteButton.classList.add('disabled');
            exportDataButton.classList.add('disabled');
        }

    };

    checkAll.addEventListener('click', function () {
        if (checkAll.checked) {
            deleteButton.classList.remove('disabled');
            exportDataButton.classList.remove('disabled')
            let checkboxes = document.querySelectorAll(
                '#mytable input[type=checkbox]',
            );
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
            });
        } else {
            deleteButton.classList.add('disabled');
            exportDataButton.classList.add('disabled');
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

    exportDataButton.addEventListener("click", function () {
        let dataToExport = []
        document.querySelectorAll('.checkthis').forEach(item => {
            if (item.checked) dataToExport.push(item.id)
        })

        const data = new URLSearchParams();
        data.append('datosJSON', JSON.stringify(dataToExport));
        fetch('/workers/download-excel', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data.toString(),
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'datos.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => {
                console.error('Hubo un error al descargar el archivo Excel: ', error);
            });
    });
});