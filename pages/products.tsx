import { Input, InputLabel, FormControl } from '@material-ui/core';

function About() {
    return (
        <FormControl>
            <InputLabel htmlFor="tomato" >Tomato</InputLabel>
            <Input id="tomato" aria-describedby="tomato-field" />
        </FormControl>
    )
}

export default About
