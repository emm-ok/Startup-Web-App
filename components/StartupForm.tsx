'use client'

import React, { useActionState, useState } from 'react'
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import MDEditor from '@uiw/react-md-editor'
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { toast } from 'sonner';
import { z } from 'zod'
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState('');

  const router =  useRouter();


  const handleFormSubmit =  async (prevState: {error: string, status: string} | undefined, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      }

      await formSchema.parseAsync(formValues);
      toast.success("Startup submitted successfully!")


      formData.append('pitch', pitch)
      const result = await createPitch(prevState || { error: '', status: 'INITIAL' }, formData);

      if(result.status === 'SUCCESS'){
        toast.success("Startup submitted successfully!");

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if(error instanceof z.ZodError){
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Please fix the errors in the form.");
        
        return { ...prevState, error: 'Validation failed', status: 'ERROR'}
      }
      
      toast.error("An unexpected error occurred");
      return { ...prevState,  error: 'An unexpected error occurred', status: 'ERROR'}
    }
  }


  const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: '', status: 'INITIAL'})


  return (
    <form action={formAction} className='startup-form flex justify-center flex-col items-center gap-5 mx-10 mb-10 border py-16 shadow-md rounded-xl'>
      <div>
        <label htmlFor="title" className='startup-form_label font-medium text-xl uppercase'>Title</label><br /><br />
        <Input 
          id='title' 
          name='title' 
          className='startup-form_input rounded-full w-[500px] border-2 outline-none border-black p-6' 
          required 
          placeholder='Startup Title' 
        />
        
        {errors.title && <p className='startup-form_error text-red-600 font-medium'>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className='startup-form_label font-medium text-xl uppercase'>Description</label><br /><br />
        <Textarea
          id='description' 
          name='description' 
          className='startup-form_input rounded-2xl w-[500px] h-[100px] border-2 outline-none border-black px-4' 
          required 
          placeholder='Startup Description' 
        />
        
        {errors.description && <p className='startup-form_error text-red-600 font-medium'>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className='startup-form_label font-medium text-xl uppercase'>Category</label><br /><br />
        <Input
          id='category' 
          name='category' 
          className='startup-form_input rounded-full w-[500px] border-2 outline-none border-black p-6' 
          required 
          placeholder='Startup Category (Tech, Health, Education...)' 
        />
        
        {errors.category && <p className='startup-form_error text-red-600 font-medium'>{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className='startup-form_label font-medium text-xl uppercase'>Image URL</label><br /><br />
        <Input
          id='link' 
          name='link' 
          className='startup-form_input rounded-full w-[500px] border-2 outline-none border-black p-6' 
          required 
          placeholder='Startup Image URL ' 
        />
        
        {errors.link && <p className='startup-form_error text-red-600 font-medium'>{errors.link}</p>}
      </div>

      <div data-color-mode='light'>
        <input type="hidden" name='pitch' value={pitch} />
        <label htmlFor="pitch" className='startup-form_label font-medium text-xl uppercase'>Pitch</label><br /><br />
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id='pitch'
          preview='edit'
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden'}}
          textareaProps={{
            placeholder: 
            "Briefly describe your I dea and what problem it solves"
          }}
          previewOptions={{
            disallowedElements: ['style']
          }}
        />
        
        {errors.pitch && <p className='startup-form_error text-red-600 font-medium'>{errors.pitch}</p>}
      </div>

      <button type='submit' className='startup-form_btn flex items-center bg-blue-600 text-white font-semibold px-10 py-4 rounded-full mt-5 hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 border-4 border-black' disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Startup'}
        <Send className='size-4 ml-2' />
      </button>

    </form>
  )
}

export default StartupForm