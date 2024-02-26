import useWindowResize from ".";

export default function TryCustomHookWindowResize() {

    const windowSize = useWindowResize();
    const { width, height } = windowSize;
    console.log(useWindowResize());

    return (
        <div>
            <h1>Try out our window resize hook</h1>
            <p>
                Width is: {width}
            </p>
            <p>
                Height is {height}
            </p>
        </div>
    );
}