interface PathFinding {
    maze: string[][];
}

export const GetMazePath = async ({ maze }: PathFinding) => {
    try {
        const response = await fetch('http://localhost:8080/findPath', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ maze: maze }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const path = data.path;

        return path;
    } catch (error) {
        console.error('Error fetching path:', error);
        return new Error('Error fetching path');
    }
};
