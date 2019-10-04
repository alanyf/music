export default function getReqName(url){
    return url.split('/').join('_');
}