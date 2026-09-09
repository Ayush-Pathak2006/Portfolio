const Lighting = () => {
    return (
        <>
            <ambientLight intensity={0.4} />

            <pointLight
                position={[3, 3, 4]}
                intensity={25}
                distance={10}
            />

            <pointLight
                position={[-3, -2, 2]}
                intensity={12}
                distance={8}
            />
        </>
    );
};

export default Lighting;