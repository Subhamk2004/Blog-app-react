import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/appwriteConfig'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    let { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    let navigate = useNavigate()
    let userData = useSelector(state => state.auth.userData)
    console.log(post);
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.fileUpload(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.articleImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                articleImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            try {
                // Check if userData exists and has $id
                if (!userData || !userData.$id) {
                    console.error("User data or user ID is missing");
                    // You might want to redirect to login or show an error message
                    navigate('/login');
                }

                const file = await service.fileUpload(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    const postData = {
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        articleImage: fileId,
                        status: data.status,
                        userId: userData.$id
                    };

                    console.log("Data being sent to createPost:", postData);
                    const dbPost = await service.createPost(postData);

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            } catch (error) {
                console.error("Error creating post:", error);
            }
        }
    };
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        let subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title),
                    { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                    label='Title'
                    placeholder='Enter the title'
                    className='mb-4'
                    {...register('title', { required: true })}
                />
                <Input
                    label='Slug'
                    placeholder='Enter the slug'
                    className='mb-4'
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label='Content :' name='Content'
                    control={control} defaultValue={getValues('content')}
                />
            </div>
            <div className='w-1/3 px-2'>
                <Input
                    label='Article Image'
                    type='file'
                    className='mb-4'
                    accept='image/png, image/jpg, image/jpeg'
                    {...register('image', { required: !post })}
                />
                {post && (
                    <div className='mb-4'>
                        <img
                            src={service.getFilePreview(post.articleImage)} alt={post.title} className='rounded-lg' />
                    </div>
                )}
                <Select
                    label='Status'
                    className='mb-4'
                    {...register('status', { required: true })}
                    options={['active', 'inactive']}
                />
                <Button type='submit' className='w-full' bgColor={post ? 'bg-green-500' : undefined}>
                    {post ? 'Update' : 'Submit'}
                </Button>
            </div>
        </form>
    )
}

export default PostForm