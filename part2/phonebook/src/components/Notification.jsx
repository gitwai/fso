const Notification = ({message}) => {
    const style = {
        color: (message.isError) ? "red" : "green",
        background: "lightgrey",
        fontSize: 20,
        border: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (!message.content)
            ? false
            :(
            <div style={style}>
            {message.content}
            </div>
            )
}

export default Notification
