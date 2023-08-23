// import BlogPostWithImage from './shared/BlogPostWithImage';
import { Heading, Box } from '@chakra-ui/react'


export default function Blogs() {
    return (
        <section id="blog">
        <Heading 
        fontSize='5xl'
        fontWeight='extrabold'
        textAlign={"center"} 
        margin={50}
        >Phone News</Heading>
        <Box marginBottom={150}>
        {/* <div className='row'>
            <div className='col-md-4'>
            <BlogPostWithImage />
            </div>
            <div className='col-md-4'>
            <BlogPostWithImage />
            </div>
            <div className='col-md-4'>
            <BlogPostWithImage />
            </div>
        </div> */}
        </Box>
        </section>
    );
  }