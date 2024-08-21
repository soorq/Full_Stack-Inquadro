'use client';

export default function ErrorProudct(error: Error) {
    console.error(error);

    return (
        <section className="h-dvh w-full">
            <div className="flex justify-center items-center h-full w-full">
                Sorry {error.stack} not found with stack {error.message}
            </div>
        </section>
    );
}
