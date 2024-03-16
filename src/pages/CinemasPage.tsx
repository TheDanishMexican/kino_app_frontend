export default function CinemasPage() {
    const [cinemas, setCinemas] = useState<Cinema[]>([])

    return (
        <div>
            <h1>Welcome to the Cinemas Page</h1>
            <p>
                This page is meant for displaying the different cinemas and
                picking showings.
            </p>
        </div>
    )
}
