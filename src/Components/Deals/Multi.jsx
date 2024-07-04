
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../Config';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleCheckmarks({ categorie, onSubCategoryChange  }) {
  const [personName, setPersonName] = useState([]);
  const [options, setOptions] = useState([]);

  const getData = async () => {
    try {
      const data = collection(db, "dealscategories");
      const q = query(data, where("categorie", "==", categorie));
      const querySnapshot = await getDocs(q);
      const categories = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log(categories);
      setOptions(categories.flatMap((category) => category.subCategorie.split(','))); 
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData();
  }, [categorie]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
    onSubCategoryChange(typeof value === 'string' ? value.split(',') : value); // Call the callback function
  };

  return (
    <div style={{maxWidth:"300px",display:"block",margin:"auto"}}>
      <FormControl>
        <InputLabel id="demo-multiple-checkbox-label">Sub Categories</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Sub Categories" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          // style={{ width: '100%' }}
          className="select-subcategory"
        >
          {/* Use the dynamically fetched options from Firestore */}
          {options.map((subCategory) => (
            <MenuItem key={subCategory} value={subCategory}>
              <Checkbox checked={personName.indexOf(subCategory) > -1} />
              <ListItemText primary={subCategory} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}