import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({ message }) => {
    if (message === null) {
        return null
    }  else {
        return (
            <>
                <Alert key={"primary"} variant={"primary"}>
                    {message}
                </Alert>
            </>
        )
    }
}

export default AlertMessage