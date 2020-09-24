import React from 'react';

function ArticleComponent (props: any) {
    console.log('[ArticleComponent], props: ', props)
    return (
        <div className="qwe">
            <pre>{JSON.stringify(props.info, null, 2) }</pre>
        </div>
    )
}

export default ArticleComponent

