import convertBlogDataToHash from "../../utils/helpers";
import dummyBlogData from "../../utils/dummyBlogData";

const normalBlogPostData: Blog[] = dummyBlogData;

const emptyBlogPostData: Blog[] = [];

describe("Testing Convert Blog Post Arr to Hash Function", () => {
  it("Convert function should map blog post items to a hashmap with two pages", () => {
    let pageSize = 5;
    let convertedBlogPostData = convertBlogDataToHash(
      normalBlogPostData,
      pageSize
    );
    expect(convertedBlogPostData[1]).to.deep.equal(
      normalBlogPostData.slice(0, pageSize)
    );
    expect(convertedBlogPostData[2]).to.deep.equal(
      normalBlogPostData.slice(pageSize, pageSize + 2)
    );
    expect(Object.keys(convertedBlogPostData).length).equal(2);
  });

  it("Convert function should return empty array if no blog posts exist", () => {
    let convertedBlogPostData = convertBlogDataToHash(emptyBlogPostData, 5);
    expect(convertedBlogPostData).to.deep.equal({ 1: [] });
  });
});
