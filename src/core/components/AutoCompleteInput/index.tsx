import React, { useState } from 'react';
import soundsConst from '../../constants/soundConst';
import playSound from '../../helpers/playSound';
import StyledAltText from './styles/StyledAltText';
import StyledLiElement from './styles/StyledLiElement';
import StyledUlElement from './styles/StyledUlElement';

interface Props {
  suggestions: string[];
}

const AutoCompleteInput = React.forwardRef<HTMLInputElement, React.PropsWithChildren<Props>>(
  ({ suggestions = [] as string[] }, ref) => {
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions || []);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInput(e.currentTarget.value);
      setFilteredSuggestions(suggestions.filter(
        (suggestion) => suggestion.toLowerCase().includes(userInput.toLowerCase()),
      ));
      setActiveSuggestion(0);
      setShowSuggestions(true);
      playSound(soundsConst.KEY);
    };

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
      setActiveSuggestion(0);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setUserInput(e.currentTarget.innerText);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setActiveSuggestion(0);
        setShowSuggestions(false);
        setUserInput(filteredSuggestions[activeSuggestion]);
      } else if (e.key === 'ArrowUp') {
        playSound(soundsConst.KEY);
        if (activeSuggestion === 0) {
          return;
        }
        setActiveSuggestion(activeSuggestion - 1);
      } else if (e.key === 'ArrowDown') {
        playSound(soundsConst.KEY);
        if (activeSuggestion + 1 === filteredSuggestions.length) {
          return;
        }
        setActiveSuggestion(activeSuggestion + 1);
      }
    };

    let suggestionsList;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsList = (
          <StyledUlElement>
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = 'active';
              }
              return (
                <StyledLiElement className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </StyledLiElement>
              );
            })}
          </StyledUlElement>
        );
      } else {
        suggestionsList = (
          <StyledAltText>
            No suggestions, you are on your own!
          </StyledAltText>
        );
      }
    }

    AutoCompleteInput.displayName = 'AutoCompleteInput';

    return (
      <label htmlFor="search">
        Enter user
        <input
          type="text"
          id="search"
          name="search"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          ref={ref}
        />
        {suggestionsList}
      </label>
    );
  },
);

export default React.memo(AutoCompleteInput);
