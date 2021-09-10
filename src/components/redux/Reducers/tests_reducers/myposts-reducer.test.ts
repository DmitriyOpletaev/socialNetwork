import myPostsReducer, {actions} from "../myPosts-reducer";

let state = {
    postData: [
        {
            id: 1,
            name: 'Acer',
            text: ''
        },
        {
            id: 2,
            name: 'Samsung',
            text: 'Умные мысли часто преследуют меня, но я быстрее. определения и уточнения дальнейших направлений развития. Повседневная практика показывает, что рамки и место обучения кадров позволяет выполнять важные задания по разработке системы обучения кадров, соответствует насущным потребностям. Таким образом постоянное информационно-пропагандистское обеспечение нашей деятельности требуют определения и уточнения новых предложений. Разнообразный и богатый опыт рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании существенных финансовых и административных условий. С другой стороны консультация с широким активом способствует подготовки и реализации соответствующий условий активизации. Таким образом постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание дальнейших направлений развития.'
        },
    ],
    newPostText: "",
}


/*test('lenght og postData should be incremented', () => {
    let action = actions.addPostActionCreator('idKamasutra')




    let newState = myPostsReducer(state, action)

    expect(newState.postData.length).toBe(3)
    expect(newState.postData[3].text).toBe('idKamasutra')
});*/



test('lenght of postData after deleting', () => {


    let action = actions.deletePost(1);



    let newState = myPostsReducer(state, action)

    expect(newState.postData.length).toBe(1)

});



