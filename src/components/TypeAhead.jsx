import {useEffect, useRef, useState} from "react";

export function TypeAhead() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const timerRef = useRef(null);

    const fetchSuggestions = async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`https://demo.dataverse.org/api/search?q=${query}`)
            const data = await response.json();
            setSuggestions(data.data.items);

        } catch (error) {
            console.log(error)
            setSuggestions([])
        } finally {
            setLoading(false)
        }
    }

    // debounce
    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            void fetchSuggestions(input)
        }, 200);
        return () => clearTimeout(timerRef.current);
    }, [input])

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setSuggestions([])
    }

    const handleClick = (suggestion) => {
        console.log(suggestion)
    }

    const handleKeyDown = (evt) => {
        const key = evt.key;
        const totalResults = suggestions.length

        switch (key) {
            case 'ArrowDown' :
                evt.preventDefault();
                setSelectedIndex(prev => {
                    if (prev === totalResults - 1) return 0;
                    else return prev + 1;
                });
                break;
            case 'ArrowUp' :
                evt.preventDefault();
                setSelectedIndex(prev => {
                    if (prev === 0) return totalResults - 1;
                    else return prev - 1;
                })
                break;
            case 'Enter':
                evt.preventDefault();
                handleClick(suggestions[selectedIndex]);
                break;
            case 'Escape':
                setSuggestions([]);
                setSelectedIndex(-1);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <input
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
            />
            {loading && <div>Loading..</div>}
            {
                suggestions.length > 0 && (
                    <ul>
                        {
                            suggestions.map((item, ind) => {
                                return (
                                    <li
                                        key={ind}
                                        onClick={() => handleClick(item)}
                                        style={{
                                            background: selectedIndex === ind ? 'blue' : "white"
                                        }}

                                    >
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}