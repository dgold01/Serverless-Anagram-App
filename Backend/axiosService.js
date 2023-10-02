const axios = require('axios');

async function fetchData(url) {
    try {
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

module.exports = {
    fetchData,
};