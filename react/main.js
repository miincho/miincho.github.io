const domNode = document.getElementById('app');

function Header({title}){
    console.log(title);
    return <h1>title</h1>
}

function HomePage(){
    return (
        <div>
            <Header title="React"/>
        </div>
    );
}

const root = ReactDOM.createRoot(domNode);
root.render(<HomePage/>);

/*chapter 6 props*/