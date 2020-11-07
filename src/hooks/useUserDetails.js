/**
 * useUserDetails hook with UserDetailsProvider
 *
 * `useUserDetails` hook can be used to get user details about any user by `userId`.
 * `UserDetailsProvider` is need to cache user details for already loaded users so we don't have to load data for the same user twice.
 */
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import { getMembersDetailsByIds } from "../services/members";

const UserDetailsContext = createContext({});
const loadingUsers = {};

/**
 * Hook which returns details of user provided by the list of userIds.
 *
 * @param {number[]} userIds user ids
 *
 * @return {Object} object that has [userId] as keys and user details as values.
 */
export const useUserDetails = (userIds) => {
  const { users, setUsers } = useContext(UserDetailsContext);

  // when requested `userIds` or already loaded `users` are changed
  // find which users are already loaded, and which we have to load
  const [foundUsers, userIdsToLoad] = useMemo(() => {
    const found = {};
    const toLoad = [];
    userIds.forEach((userId) => {
      if (typeof users[userId] !== "undefined") {
        found[userId] = users[userId];
      } else if (!loadingUsers[userId]) {
        toLoad.push(userId);
      }
    });
    return [found, toLoad];
  }, [userIds, users]);

  // if there are any users has to be loaded, then start loading them
  useEffect(() => {
    if (userIdsToLoad.length > 0) {
      // mark users which are being loaded
      userIdsToLoad.forEach((loadingUserId) => {
        loadingUsers[loadingUserId] = true;
      });

      getMembersDetailsByIds(userIdsToLoad).then((members) => {
        const newUsers = { ...users };
        members.forEach((member) => {
          newUsers[member.userId] = member;
          delete loadingUsers[member.userId];
        });
        setUsers(newUsers);
      });
    }
  }, [userIdsToLoad, users, setUsers]);

  return foundUsers;
};

/**
 * Provides a place where we catch loaded user details.
 */
export const UserDetailsProvider = ({ children }) => {
  const [users, setUsers] = useState({});
  return (
    <UserDetailsContext.Provider value={{ users, setUsers }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
