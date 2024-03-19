import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";
import Icon from "../components/Icon";

export const Signup = () => {
  return (
    <div className="relative">
      <div className="h-1/3 w-1/3 absolute top-12 left-2/4 mix-blend-exclusion	">
          <Icon></Icon>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        <div>
          <Auth type="signup"></Auth>
        </div>
        
        <div className="hidden lg:block">
          <div className="absolute bottom-0 right-0 ">
            <Quote></Quote>
          </div>
        </div>
      </div>
    </div>
  );
};
