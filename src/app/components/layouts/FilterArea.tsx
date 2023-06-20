"use client";

import styles from "./Filter.module.css"
import { User , Search} from "../../global.t";
import React, { useEffect, useState } from "react";
import Checkbox from "@/app/components/elements/Checkbox";
import axios from 'axios';

interface Param {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setFilterWords: React.Dispatch<React.SetStateAction<string[]>>
  filterWords: string[]
  setShowUserCard: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterArea: React.FC<Param> = ({ setUsers, setFilterWords, filterWords , setShowUserCard}) => { 
  
  const [isClick, setClick] = useState(false);

  const [selectedSystems, setSystem] = useState<string[]>([]);
  const [selectedGenres, setGenre] = useState<string[]>([]);
  const [selectedLanguage, setLanguage] = useState<string>("");
  const [selectedRegion, setRegion] = useState<string[]>([]);

  const languages: string[] = ["English", "Spanish", "German", "French", "Japanese", "Chinese", "Korean"];
  const genres: string[] = ["Shooters", "Survial", "Battle Royal", "Strategy","Party","Fighting","RPG","MMO"];
  const systems: string[] = ["PC", "Switch", "PlayStation", "Xbox"];
  const regions: string[] = ["North America", "South America", "Africa", "Europe", "Asia", "Oceania"];
  
  const handleFilterClick = (e:React.MouseEvent<HTMLButtonElement>) => { 
    setClick(!isClick);
    setShowUserCard(false);
    // the words for filter is reset;
    setFilterWords([]);
  }
  
  const handleApply = async(event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/filter-users/";

    const config = {
      method: 'GET',
      headers: {
        systems:JSON.stringify(selectedSystems),
        genre: JSON.stringify(selectedGenres),
        language: selectedLanguage.toLowerCase(),
        regions: JSON.stringify(selectedRegion)
      }
    }

     try { 
      const response = await axios.get(url, config);
      const allWords: string[] = [...selectedSystems, ...selectedGenres, ...selectedRegion];
      allWords.push(selectedLanguage);
      setFilterWords(allWords);
      
      setUsers(response.data);
      // user Data component will show up
      setShowUserCard(true);
      // defatult filter will show up
      setClick(!isClick);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * check slectedItems has target or not.
   * @param target  
   * @param selectedItems 
   * @param setItems 
   */

  const handleSelection = (target:string,
    selectedItems: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>): void => {
    const targetLowerCase = target.toLowerCase();
    if (selectedItems.includes(targetLowerCase)) {
      setItems((prevItems: string[]) => prevItems.filter((item: string) => item !== targetLowerCase));
    } else {
      setItems((prevItems: string[]) => [...prevItems, targetLowerCase]);
    }
  };
  
  const handleGenre = (event: { target: { name : string }; }) => {
    const { name } = event.target;
    handleSelection(name, selectedGenres, setGenre);
  }

  const handleSystem = (event: { target: { name : string }; }) => {
    const { name } = event.target;
    handleSelection(name, selectedSystems, setSystem);
  }

  const handleRegion = (event: { target: { name: string } }) => { 
    const { name } = event.target;
    handleSelection(name, selectedRegion, setRegion);
  } 

  const handleLanguage = (event: { target: {name:string} }) => { 
    const { name } = event.target;
    if (selectedLanguage === name) {
      setLanguage("");
    } else {
      setLanguage(name);
    }
  }

  return (
    <>
      {isClick ? (
        <div>
        <form onSubmit={handleApply}>
            <div className={styles.filterCategory}>
              <fieldset>
                {systems.map((system, key) => { 
                  const isCheckBoxChecked = selectedSystems.includes(system.toLowerCase());
                  return (
                    <div className={styles.category}  key={key}>
                      <label>
                        <input type="checkbox" name={system} checked={isCheckBoxChecked} onChange={handleSystem} />
                        <span>{system}</span>
                      </label>
                    </div>
                  )
                })} 
              </fieldset>
            </div>

        <div className={styles.filterCategory}>
              <fieldset>
                {genres.map((genre, key) => { 
                  const isCheckBoxChecked = selectedGenres.includes(genre.toLowerCase());
                  return (
                    <div className={styles.category} key={key} >
                     <label>
                        <input type="checkbox" name={genre} checked={isCheckBoxChecked} onChange={handleGenre} />
                        <span>{genre}</span>
                      </label>
                    </div>
                  )
                })} 
              </fieldset>
            </div>
            
            <div className={styles.filterCategory}>
              <fieldset>
                {regions.map((region, key) => { 
                  const isCheckBoxChecked = selectedRegion.includes(region.toLowerCase());
                  return (
                    <div className={styles.category} key={key} >
                     <label>
                        <input type="checkbox" name={region} checked={isCheckBoxChecked} onChange={handleRegion} />
                        <span>{region}</span>
                      </label>
                    </div>
                  )
                })} 
              </fieldset>
          </div>

          <div className={styles.filterCategory}>
              <fieldset>
              {languages.map((language, key) => { 
                  return (
                    <div className={styles.category} key={key} >
                       <label>
                        <input type="checkbox" name={language} checked={selectedLanguage === language} onChange={handleLanguage} />
                        <span>{language}</span>
                      </label>
                    </div>
                  )
                })} 
              </fieldset>
          </div>
          
          <button type="submit">Filter</button>
        </form>
        </div>
        
      ) : (
      <div className={styles.filterArea}>
        <div className={styles.filter}>
          <button onClick={handleFilterClick}>Filter</button>
        </div>
              {filterWords.map((word,key) => { 
                return (
                  <div className={styles.word} key={key}>
                    <p >{word}</p>
                  </div>
                )
              })}
      </div>
      ) }
    </>
    )
}

export default FilterArea