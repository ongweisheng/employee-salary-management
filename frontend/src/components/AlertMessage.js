import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({ message }) => {
    if (message === null) {
        return null
    } else if (message.includes("Error")) {
        return (
            <>
                <Alert key={"danger"} variant={"danger"}>
                    {message}
                </Alert>
            </>
        )
    } else {
        return (
            <>
                <Alert key={"success"} variant={"success"}>
                    {message}
                </Alert>
            </>
        )
    }
}

export default AlertMessage