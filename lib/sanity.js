import {
    createClient,
    createPreviewSubscriptionHook,
} from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import { PortableText as PortableTextComponent } from '@portabletext/react';


const config = {
    projectId: "wedj3dms",
    dataset: "production",
    apiVersion: "2021-10-21",
    useCdn: false,
}

export const sanityClient = createClient(config)

export const usePreviewSubscription = createPreviewSubscriptionHook(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const PortableText = (props) => <PortableTextComponent components={{}} {...props} />

// 1:24:44