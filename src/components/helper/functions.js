import Swal from 'sweetalert2'

const showAlert = (title, message, type = "success", buttonColor = "#3085d6") => {
    Swal.fire({
        title: title,
        text: message,
        icon: type,
        confirmButtonText: "OK",
        confirmButtonColor: buttonColor
    });
};

export default showAlert;