'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const NewIssuePage = () => {
  const [error, setError] = useState('');

  type IssueForm = {
    title: string
    description: string
  }

  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();
  return (
    <div>
      {error && (<Callout.Root color='red'>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    <form className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async (data) => {
      try {
        await axios.post('/api/issues', data);
        router.push('/issues');
      } catch (error) {
        console.log(error)
        setError('An unexpected error occured.')
      }
    })}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')}/>
      </TextField.Root>
      <Controller
      name = 'description'
      control={control}
      render={({ field }) => <SimpleMDE placeholder='description' { ...field }/>}
      />
      <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage