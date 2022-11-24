import CustomCard from "./CustomCard";
import GroupImg from "./groupImages";
import TradeNft from "./nftTradeComponent";
import TopSection from "./topSection";
import DidComponent from "./didComponents";
import CommunityComponent from "./communityComponent";
import CommentComponent from "./commentComponent";
import SocialComponent from "./socialComponent";
import TokenTrade from "./tokenTrade";
import TokenComponent from "./tokenComponent";
import Img from "./Img";


export default function Lside()
{
    const i = <Img src= "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg?w=2000" w={100} h={100} />;
    const groupImg = [<GroupImg key = {1} title = "Entrepot" />, <GroupImg key = {2} title = "Entrepot" />, <GroupImg key = {3} title = "Entrepot" /> ]
    const trade = [<TradeNft key={1} img = {i} price = {"BuY @ 2.3"} date = {"12/02/2001"} title = "Entrepot" />, <TradeNft key={2} img = {i} price = {"BuY @ 2.3"} date = {"12/02/2001"} title = "Entrepot" />, <TradeNft key={3} img = {i} price = {"BuY @ 2.3"} date = {"12/02/2001"} title = "Entrepot" />];
    const token = [<TokenTrade key={1} misc= {i} date="12/4/2002" title="Testing"/>, <TokenTrade key={2} misc= {i} date="12/4/2002" title="Testing"/>, <TokenTrade key={3} misc= {i} date="12/4/2002" title="Testing"/>];




    // This function return Card reprensentin individual section in the page accepts other sub component as props.

    return(
        <>
            <CustomCard item = {<TopSection />} />{/* ratail  */} 
            
            <CustomCard title="Ratail" item = { <GroupImg title = "Entrepot" /> } /> {/* ratail  */}            
            
            <CustomCard title = "NFT" item = {
                
                groupImg.map(item=>{
                    return item
                })
                } 
            /> {/* Nft card  */}
            
            <CustomCard title = "NFT Trade" item = 
            {
                trade.map(item=>{
                    return item
                })

            } />
            
            <CustomCard title = "Token"  item={ <TokenComponent />} /> {/* Token */}
            
            <CustomCard title = "Token Trade" item = {
               token.map(item=>{
                return item
                })
            }/> {/* Token Trade */}
            
            <CustomCard title = "Community Voting" item={<CommunityComponent />}/> {/* Coumunity Voting */}
            
            <CustomCard title = "DID" item = {<DidComponent title = "ICNS" sub = "tomada.icp" />} /> {/* DND */}

            <CustomCard title = "SOCIAL MEDIA" item = {<SocialComponent title = "ICNS" />} /> {/* SOCIAL */}

            <CustomCard title = "COMMENT" item = {<CommentComponent title = "ICNS" sub = "tomada.icp" />} /> {/* COMMENT */}
        </>
    )
}