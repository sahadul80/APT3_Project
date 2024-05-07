export default function About() {
    return (
        <>
        <center>
            {/* The button to open modal */}
            <label htmlFor="my_modal_6" className="btn">About</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">About US</h3>
                    <p className="py-4">As a non-profitable organization,
                        EA should create the scope for the students
                        and provide free education to the poor to
                        develop better careers. After proper
                        implementations, the researcher can also
                        spend their quality time on this platform
                        to explore and publish their articles easily.
                        These students and research works can be
                        contributed as an asset for development.
                        Hence, the education sector of our country
                        might get strong enough to mitigate any crisis
                        effectively and improvise global contribution.</p>
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn">Close!</label>
                    </div>
                </div>
                </div>
            </center>
        </>
    );
}
