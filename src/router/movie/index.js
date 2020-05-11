export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'comming',
            component: () => import('@/components/CommingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            path: 'now',
            component: () => import('@/components/Nowplaying')
        },
        {
            path: 'detail',
            components: {
                detail: () => import('@/views/Movie/detail')
            }
        },
        {
            path: '/movie',
            redirect: "/movie/now"
        }

    ]
}