export const getAnimatedNodePosition = (
    basePosition,
    animation,
    elapsedTime
) => {
    const {
        amplitude = 0.1,
        speed = 1,
        phase = 0,
    } = animation ?? {};

    const offset = Math.sin(
        elapsedTime * speed + phase
    ) * amplitude;

    return [
        basePosition[0],
        basePosition[1] + offset,
        basePosition[2],
    ];
};