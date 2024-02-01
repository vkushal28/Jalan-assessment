import React, { useEffect, useState } from 'react';

const GuestForm = ({ onAddGuest, loading, guestAdded, resetAddGuest }) => {
    const [guestCount, setGuestCount] = useState(1);
    const [ages, setAges] = useState(Array(guestCount).fill(''));

    const isAddGuestButtonDisabled = ages.some((age) => age === '');


    const handleAddGuest = () => {
        const guests = ages.map((age, index) => ({
            name: `Guest${index + 1}`,
            age: parseInt(age),
        }));

        onAddGuest(guests);
    };

    const handleGuestCountChange = (count) => {
        count = Math.max(0, parseInt(count)); // to avoid negative values
        setGuestCount(count);
        setAges(Array(count).fill(''));
    };

    useEffect(() => {
        if (guestAdded) {
            resetAddGuest();
            setGuestCount(1);
            setAges(['']);
        }
    }, [guestAdded, resetAddGuest])

    return (
        <div>
            <h2>Add Guests</h2>
            <label>
                Number of Guests:
                <input
                    type="number"
                    value={guestCount}
                    onChange={(e) => handleGuestCountChange(parseInt(e.target.value))}
                />
            </label>
            {ages.map((age, index) => (
                <div key={index}>
                    <label>
                        Age of Guest {index + 1}:
                        <input
                            type="number"
                            value={age}
                            onChange={(e) =>
                                setAges((prevAges) => [
                                    ...prevAges.slice(0, index),
                                    Math.max(0, parseInt(e.target.value)),
                                    ...prevAges.slice(index + 1),
                                ])
                            }
                        />
                    </label>
                </div>
            ))}
            <button
                onClick={handleAddGuest}
                disabled={loading || isAddGuestButtonDisabled}
            >
                {loading ? 'Adding...' : 'Add Guests'}
            </button>
        </div>
    );
};

export default GuestForm;
